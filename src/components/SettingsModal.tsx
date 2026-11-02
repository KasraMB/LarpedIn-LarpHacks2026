import React, { useState } from 'react';
import { X, Sparkles, Cpu, Key, Volume2, VolumeX, Flame, Zap, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { FeatherlessConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FeatherlessConfig;
  onSaveConfig: (newConfig: FeatherlessConfig) => void;
  onTriggerManualBomb: () => void;
  onRegenerateInMails: (apiKey: string, model: string) => Promise<void>;
  isGeneratingInMails: boolean;
}

const FEATHERLESS_MODELS = [
  { id: 'Qwen/Qwen2.5-7B-Instruct', name: 'Qwen 2.5 7B Instruct (Recommended - Fast & Ungated)' },
  { id: 'mistralai/Mistral-7B-Instruct-v0.3', name: 'Mistral 7B Instruct v0.3 (Fast & Ungated)' },
  { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct', name: 'Meta Llama 3.1 8B Instruct (Requires Gated HF access)' },
  { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B IT' },
  { id: 'microsoft/Phi-3.5-mini-instruct', name: 'Phi 3.5 Mini Instruct' }
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onTriggerManualBomb,
  onRegenerateInMails,
  isGeneratingInMails
}) => {
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [selectedModel, setSelectedModel] = useState(config.model);
  const [intensity, setIntensity] = useState(config.hypeIntensity);
  const [soundEnabled, setSoundEnabled] = useState(config.soundEnabled);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({ loading: false });

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      apiKey: apiKey.trim(),
      model: selectedModel,
      useFeatherless: Boolean(apiKey.trim()),
      hypeIntensity: intensity,
      soundEnabled
    });
    onClose();
  };

  const handleSaveAndGenerateFresh = async () => {
    const cleanKey = apiKey.trim();
    onSaveConfig({
      apiKey: cleanKey,
      model: selectedModel,
      useFeatherless: Boolean(cleanKey),
      hypeIntensity: intensity,
      soundEnabled
    });
    await onRegenerateInMails(cleanKey, selectedModel);
    onClose();
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });
    try {
      const res = await fetch('/api/generate-inmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          model: selectedModel,
          recruiter: { name: 'Sarah Chen', title: 'Staff Recruiter', company: 'OpenAI' },
          userProfile: { name: 'Alex Rivera', headline: 'Quantitative Developer at Jane Street' }
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setTestStatus({
          loading: false,
          success: true,
          message: `Success! (${data.provider} - ${data.model || selectedModel}): "${data.text.slice(0, 110)}..."`
        });
      } else {
        setTestStatus({
          loading: false,
          success: false,
          message: data.error || 'Failed to connect. Check your API key or model name.'
        });
      }
    } catch (err: any) {
      setTestStatus({
        loading: false,
        success: false,
        message: err.message || 'Connection test error'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#0a66c2]" />
            <h2 className="font-bold text-base text-slate-900">
              Featherless AI & Recruiter Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {/* Featherless AI Info Callout */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-slate-700 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-[#0a66c2] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Live Featherless AI Model Hosting</span>
            </div>
            Featherless hosts open-weights LLMs for fast responses. Enter your API key below and select your model. Clicking <strong>"Generate Fresh InMails via AI"</strong> will immediately replace preloaded messages with brand-new, unique InMails generated on the fly!
          </div>

          {/* API Key Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-500" />
                <span>Featherless API Key:</span>
              </span>
              <a
                href="https://featherless.ai"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#0a66c2] hover:underline font-semibold"
              >
                Get Key at featherless.ai ↗
              </a>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="e.g. featherless_..."
              className="w-full text-xs text-slate-900 font-mono bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>

          {/* Model Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Select Featherless Hosted Model:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-[#0a66c2]"
            >
              {FEATHERLESS_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Direct Fresh InMail Generation Button */}
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Generate Brand New AI InMails Now</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                Live AI Generation
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-snug">
              Instructs OpenAI, Anthropic, Google DeepMind, and Nvidia recruiters to generate completely unique, unprompted InMail messages tailored to your profile.
            </p>
            <button
              type="button"
              onClick={handleSaveAndGenerateFresh}
              disabled={isGeneratingInMails}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              {isGeneratingInMails ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating New InMails with {selectedModel.split('/')[1] || selectedModel}...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>⚡ Generate Fresh InMails via Featherless AI</span>
                </>
              )}
            </button>
          </div>

          {/* Test Connection Button */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testStatus.loading}
              className="w-full py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              {testStatus.loading ? (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing Featherless API response...</span>
                </span>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Test Single InMail Generation</span>
                </>
              )}
            </button>

            {testStatus.message && (
              <div
                className={`p-2.5 rounded-lg text-[11px] flex items-start gap-2 ${
                  testStatus.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {testStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span className="leading-tight">{testStatus.message}</span>
              </div>
            )}
          </div>

          {/* Attention Intensity Level */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Attention Bombardment Intensity:</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setIntensity('mild')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  intensity === 'mild'
                    ? 'border-[#0a66c2] bg-blue-50/50 ring-1 ring-[#0a66c2]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block text-slate-900">Mild</span>
                <span className="text-[10px] text-slate-500">Every 45s</span>
              </button>

              <button
                type="button"
                onClick={() => setIntensity('frenzy')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  intensity === 'frenzy'
                    ? 'border-[#0a66c2] bg-blue-50/50 ring-1 ring-[#0a66c2]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block text-orange-700">Frenzy</span>
                <span className="text-[10px] text-slate-500">Every 15s (Best)</span>
              </button>

              <button
                type="button"
                onClick={() => setIntensity('meltdown')}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  intensity === 'meltdown'
                    ? 'border-[#0a66c2] bg-blue-50/50 ring-1 ring-[#0a66c2]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block text-red-700">Meltdown</span>
                <span className="text-[10px] text-slate-500">Every 7s (Crazy)</span>
              </button>
            </div>
          </div>

          {/* Audio Chime Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#0a66c2]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <div>
                <span className="text-xs font-bold text-slate-900 block">Recruiter Audio Chime</span>
                <span className="text-[10px] text-slate-500">Play chime on incoming InMails & offers</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                soundEnabled ? 'bg-[#0a66c2]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Emergency Ego Boost / Bomb Me Now */}
          <div>
            <button
              type="button"
              onClick={() => {
                onTriggerManualBomb();
                onClose();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:opacity-95 text-white text-xs font-extrabold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>Trigger Live Recruiter Bomb Now (AI Inbound)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-1.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-xs"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
