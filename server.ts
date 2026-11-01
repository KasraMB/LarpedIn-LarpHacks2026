import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

// In-memory server-side storage for active key & model (fallback to env)
let serverStoredApiKey = process.env.FEATHERLESS_API_KEY || '';
let serverStoredModel = 'Qwen/Qwen2.5-7B-Instruct';

// Endpoint to persist / sync key to server
app.post('/api/save-config', (req, res) => {
  const { apiKey, model } = req.body;
  if (apiKey !== undefined) {
    serverStoredApiKey = apiKey.trim();
  }
  if (model !== undefined) {
    serverStoredModel = model.trim();
  }
  console.log(`[Config Saved] Server active Featherless key length: ${serverStoredApiKey.length}, model: ${serverStoredModel}`);
  res.json({
    success: true,
    hasKey: Boolean(serverStoredApiKey),
    model: serverStoredModel
  });
});

// Config info
app.get('/api/config', (req, res) => {
  res.json({
    hasFeatherlessEnvKey: Boolean(serverStoredApiKey || process.env.FEATHERLESS_API_KEY),
    currentModel: serverStoredModel,
    availableFeatherlessModels: [
      'Qwen/Qwen2.5-7B-Instruct',
      'mistralai/Mistral-7B-Instruct-v0.3',
      'meta-llama/Meta-Llama-3.1-8B-Instruct',
      'google/gemma-2-9b-it',
      'microsoft/Phi-3.5-mini-instruct'
    ]
  });
});

/**
 * Consolidates and sanitizes chat history for strict Hugging Face / vLLM chat templates
 * (e.g. Llama 3, Mistral require alternating user/assistant messages and starting with user).
 */
function sanitizeMessagesForFeatherless(systemPrompt: string, rawMessages: any[], latestUserText?: string) {
  const list: { role: 'user' | 'assistant'; content: string }[] = [];

  for (const m of rawMessages || []) {
    const role = m.sender === 'user' ? 'user' : 'assistant';
    const text = (m.text || '').trim();
    if (!text) continue;

    const last = list[list.length - 1];
    if (last && last.role === role) {
      last.content += '\n' + text;
    } else {
      list.push({ role, content: text });
    }
  }

  if (latestUserText && latestUserText.trim()) {
    const last = list[list.length - 1];
    if (last && last.role === 'user') {
      if (!last.content.includes(latestUserText.trim())) {
        last.content += '\n' + latestUserText.trim();
      }
    } else {
      list.push({ role: 'user', content: latestUserText.trim() });
    }
  }

  // Ensure first message after system is from user
  if (list.length > 0 && list[0].role === 'assistant') {
    list.unshift({
      role: 'user',
      content: '[Recruiter initiated outreach on LinkedIn]'
    });
  }

  if (list.length === 0) {
    list.push({
      role: 'user',
      content: 'Hello'
    });
  }

  return [
    { role: 'system', content: systemPrompt },
    ...list
  ];
}

// Call Featherless AI
async function callFeatherless(apiKey: string, model: string, messages: any[], maxTokens = 350) {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    throw new Error('No Featherless API key provided.');
  }

  const targetModel = model || serverStoredModel || 'Qwen/Qwen2.5-7B-Instruct';
  const payload = {
    model: targetModel,
    messages,
    temperature: 0.75,
    max_tokens: maxTokens
  };

  console.log(`[Featherless] Calling ${targetModel} with ${messages.length} messages...`);

  const res = await fetch('https://api.featherless.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${cleanKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://linkedout.app',
      'X-Title': 'LinkedOut'
    },
    body: JSON.stringify(payload)
  });

  const responseText = await res.text();
  console.log(`[Featherless] HTTP ${res.status}`);

  if (!res.ok) {
    let parsedMsg = responseText;
    try {
      const errJson = JSON.parse(responseText);
      parsedMsg = errJson.error?.message || errJson.message || responseText;
    } catch {}
    throw new Error(`Featherless API Error (${res.status}): ${parsedMsg}`);
  }

  let data: any;
  try {
    data = JSON.parse(responseText);
  } catch (err) {
    throw new Error('Featherless returned invalid JSON: ' + responseText);
  }

  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Featherless returned an empty completion.');
  }
  return text.trim();
}

// Endpoint 1: Chat interaction (user talks to recruiter)
app.post('/api/chat', async (req, res) => {
  const { messages, recruiter, userProfile, apiKey, model } = req.body;
  const featherlessKey = (apiKey || serverStoredApiKey || process.env.FEATHERLESS_API_KEY || '').trim();
  const targetModel = model || serverStoredModel || 'meta-llama/Meta-Llama-3.1-8B-Instruct';

  console.log(`[/api/chat] User msg count: ${messages?.length || 0}, key present: ${Boolean(featherlessKey)}`);

  const systemPrompt = `You are ${recruiter?.name || 'Sarah Chen'}, an elite ${recruiter?.title || 'Principal Technical Recruiter'} at ${recruiter?.company || 'OpenAI'}.
The user is ${userProfile?.name || 'Alex Rivera'}, a legendary, ultra-talented Jane Street quantitative developer whom your company's executive leadership (CEOs, VPs, CTOs) is desperately trying to recruit.
You consider them a 1-in-a-million generational 10x engineering talent.
Your instructions:
- Directly respond to what the user actually said. If they say "Hi" or "Hello", warmly greet them back, express excitement that they finally replied to your InMail, and pitch them on why ${recruiter?.company || 'OpenAI'} wants them.
- If they ask questions or make demands (salary, remote, tech stack), eagerly accommodate them.
- Tone: Professional, enthusiastic, flattering, charismatic, and urgent (1 to 2 short paragraphs).
- Never break character.`;

  if (featherlessKey) {
    try {
      const formattedMessages = sanitizeMessagesForFeatherless(systemPrompt, messages);
      const replyText = await callFeatherless(featherlessKey, targetModel, formattedMessages, 350);
      return res.json({
        text: replyText,
        provider: 'featherless',
        model: targetModel
      });
    } catch (err: any) {
      console.error('Featherless error in /api/chat:', err.message);
      // Transparently inform the user of the Featherless error
      return res.json({
        text: `⚠️ [Featherless AI Error]: ${err.message}. Please check your API key and model selection in Settings.`,
        provider: 'featherless-error',
        error: err.message
      });
    }
  }

  // If no key is set yet, explicitly inform the user instead of spitting canned text
  return res.json({
    text: `⚠️ [Featherless AI Notice]: No Featherless API Key configured. Please click "AI Recruiter Engine & Settings" in the top bar to paste your Featherless key so ${recruiter?.name || 'the recruiter'} can respond with live AI!`,
    provider: 'no-key'
  });
});

// Endpoint 2: Generate fresh InMail dynamically via Featherless AI
app.post('/api/generate-inmail', async (req, res) => {
  const { recruiter, userProfile, apiKey, model, urgentContext } = req.body;
  const featherlessKey = (apiKey || serverStoredApiKey || process.env.FEATHERLESS_API_KEY || '').trim();
  const targetModel = model || serverStoredModel || 'meta-llama/Meta-Llama-3.1-8B-Instruct';

  const systemPrompt = `You are ${recruiter?.name || 'Sarah Chen'}, ${recruiter?.title || 'Staff Recruiter'} at ${recruiter?.company || 'OpenAI'}.
Write a brand-new, urgent, personalized LinkedIn InMail to ${userProfile?.name || 'Alex Rivera'} (${userProfile?.headline || 'Quantitative Developer at Jane Street'}).
The context: You and your company's executive team are frantically trying to hire them right now.
${urgentContext || 'You just saw their recent distributed systems benchmarks, and your CEO specifically flagged their profile this morning.'}
Offer an unbelievable 7-figure compensation package ($1.1M to $1.6M TC), mention that all interview loops are waived, and plead with them for a quick 10-minute chat before a rival tech company signs them.
Keep it punchy, authentic to Silicon Valley executive recruiting, flattering, and urgent (2 to 3 sentences).
Output ONLY the message text. No placeholders, no brackets.`;

  if (featherlessKey) {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Please write a fresh, urgent InMail to ${userProfile?.name || 'Alex'}.` }
      ];
      const text = await callFeatherless(featherlessKey, targetModel, messages, 250);
      return res.json({ text, provider: 'featherless', model: targetModel });
    } catch (err: any) {
      console.error('Featherless InMail generation failed:', err.message);
      return res.json({
        text: `⚠️ [Featherless AI Error]: ${err.message}`,
        provider: 'featherless-error',
        error: err.message
      });
    }
  }

  return res.json({
    text: `${userProfile?.name?.split(' ')[0] || 'Alex'}, our CEO literally stopped our morning all-hands to pull up your profile. We just pre-authorized an unannounced $1.35M Principal Fellow package ($550k base + accelerated liquid equity) with zero interview loops. Can I send our executive one-pager over?`,
    provider: 'dynamic-instant'
  });
});

// Endpoint 3: Regenerate all initial threads with fresh AI messages
app.post('/api/regenerate-all-inmails', async (req, res) => {
  const { recruiters, userProfile, apiKey, model } = req.body;
  const featherlessKey = (apiKey || serverStoredApiKey || process.env.FEATHERLESS_API_KEY || '').trim();
  const targetModel = model || serverStoredModel || 'meta-llama/Meta-Llama-3.1-8B-Instruct';

  const results: any[] = [];

  for (const rec of recruiters || []) {
    const prompt = `You are ${rec.name}, ${rec.title} at ${rec.company}.
Write a fresh, brand-new opening InMail message to ${userProfile?.name || 'Alex'} (${userProfile?.headline || 'Quantitative Developer at Jane Street'}).
Mention you are actively competing against other Big Tech firms to hire them. Mention an offer range around ${rec.initialOffer || '$1.2M TC'}.
Keep it 2-3 sentences, urgent, and flattering. Output ONLY the message text.`;

    let generatedText = '';
    let provider = 'dynamic-instant';

    if (featherlessKey) {
      try {
        generatedText = await callFeatherless(featherlessKey, targetModel, [
          { role: 'system', content: prompt },
          { role: 'user', content: 'Write the opening InMail now.' }
        ], 220);
        provider = 'featherless';
      } catch (err: any) {
        console.error(`Featherless failed for ${rec.name}:`, err.message);
        generatedText = `⚠️ [Featherless AI]: Failed to generate for ${rec.name} (${err.message})`;
        provider = 'featherless-error';
      }
    } else {
      generatedText = `${userProfile?.name?.split(' ')[0] || 'Alex'}! Our leadership at ${rec.company} is prepared to offer you an executive package of ${rec.initialOffer || '$1.2M TC'} with zero interview rounds. Can we steal 10 minutes on your calendar tomorrow?`;
    }

    results.push({
      recruiterId: rec.id,
      text: generatedText,
      provider,
      model: targetModel
    });
  }

  res.json({ results });
});

// Dev and production serving
const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
