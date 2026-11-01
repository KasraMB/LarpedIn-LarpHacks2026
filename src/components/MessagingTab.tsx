import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Cpu,
  RefreshCw,
  Zap,
  Mail,
  Key,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ChatThread, UserProfile, FeatherlessConfig } from '../types';

interface MessagingTabProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onSendMessage: (threadId: string, text: string) => void;
  onRegenerateAllInMails: () => Promise<void>;
  onTriggerRecruiterInMail: (threadId: string) => Promise<void>;
  onSaveQuickApiKey: (key: string) => void;
  userProfile: UserProfile;
  featherlessConfig: FeatherlessConfig;
  isRecruiterTyping: boolean;
  isGeneratingInMails: boolean;
  onOpenSettings: () => void;
  onViewOffers: () => void;
}

export const MessagingTab: React.FC<MessagingTabProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onSendMessage,
  onRegenerateAllInMails,
  onTriggerRecruiterInMail,
  onSaveQuickApiKey,
  userProfile,
  featherlessConfig,
  isRecruiterTyping,
  isGeneratingInMails,
  onOpenSettings,
  onViewOffers
}) => {
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [inlineKey, setInlineKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages.length, isRecruiterTyping]);

  const filteredThreads = threads.filter(
    (t) =>
      t.recruiter.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.recruiter.company.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  const sendQuickDemand = (demandText: string) => {
    if (!activeThread) return;
    onSendMessage(activeThread.id, demandText);
  };

  const handleSaveInlineKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineKey.trim()) return;
    onSaveQuickApiKey(inlineKey.trim());
    setShowKeyInput(false);
  };

  return (
    <div className="max-w-[1120px] mx-auto bg-white rounded-lg border border-[#e0dfdc] shadow-xs overflow-hidden h-[calc(100vh-80px)] min-h-[580px] flex">
      {/* Left Column: Thread List */}
      <div className="w-80 sm:w-96 border-r border-[#e0dfdc] flex flex-col shrink-0">
        {/* Search & AI Actions Header */}
        <div className="p-3 border-b border-slate-200 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-900">Messaging</h2>
            <button
              onClick={onRegenerateAllInMails}
              disabled={isGeneratingInMails}
              className="text-[11px] font-bold text-white bg-[#0a66c2] hover:bg-[#004182] px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
              title="Replace all preloaded messages with fresh AI-generated InMails"
            >
              {isGeneratingInMails ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Generating AI...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span>Fresh AI InMails</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-[#edf3f8] text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3 py-1.5 rounded-md focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-[#0a66c2]"
            />
          </div>
        </div>

        {/* Thread List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredThreads.map((thread) => {
            const isSelected = thread.id === activeThread?.id;
            const lastMsg = thread.messages[thread.messages.length - 1];

            return (
              <div
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#edf3f8] border-l-4 border-l-[#0a66c2]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.recruiter.avatar}
                    alt={thread.recruiter.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  {thread.recruiter.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {thread.recruiter.name}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {thread.lastMessageTimestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate font-medium">
                    {thread.recruiter.title} @ {thread.recruiter.company}
                  </p>

                  <p className={`text-xs mt-1 truncate ${thread.unreadCount > 0 ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                    {lastMsg ? lastMsg.text : 'No messages yet'}
                  </p>

                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {thread.recruiter.initialOffer.split('(')[0]}
                    </span>
                    {thread.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-[#dc2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      {activeThread ? (
        <div className="flex-1 flex flex-col h-full bg-[#f4f2ee]">
          {/* Conversation Header */}
          <div className="p-3 bg-white border-b border-[#e0dfdc] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={activeThread.recruiter.avatar}
                alt={activeThread.recruiter.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-900">
                    {activeThread.recruiter.name}
                  </h3>
                  <span className="text-sm">{activeThread.recruiter.companyLogo}</span>
                  <span className="text-xs text-slate-400 font-medium">· 1st</span>
                </div>
                <p className="text-xs text-slate-500">
                  {activeThread.recruiter.title} at <strong className="text-slate-700">{activeThread.recruiter.company}</strong>
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                  <span className="text-emerald-600 font-medium">● Online now & ready to hire</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{activeThread.recruiter.mutualConnections} mutual connections</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onTriggerRecruiterInMail(activeThread.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                title="Force this recruiter to generate a new AI InMail right now"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Trigger New InMail</span>
              </button>
              <button
                onClick={onViewOffers}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Comp Sheet</span>
              </button>
            </div>
          </div>

          {/* Model & API Key Status Bar */}
          <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-600 gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#0a66c2]" />
              {featherlessConfig.apiKey ? (
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Featherless Key Active ({featherlessConfig.apiKey.slice(0, 8)}...{featherlessConfig.apiKey.slice(-4)})</span>
                  <span className="text-slate-400 font-normal">·</span>
                  <span className="text-slate-700 font-normal">{featherlessConfig.model.split('/')[1] || featherlessConfig.model}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-700 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>No Featherless Key set</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!featherlessConfig.apiKey && !showKeyInput && (
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors"
                >
                  + Paste Key Here
                </button>
              )}
              {showKeyInput && (
                <form onSubmit={handleSaveInlineKey} className="flex items-center gap-1">
                  <input
                    type="password"
                    value={inlineKey}
                    onChange={(e) => setInlineKey(e.target.value)}
                    placeholder="featherless_..."
                    className="text-xs px-2 py-0.5 bg-white border border-slate-300 rounded font-mono w-44"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-xs font-bold text-white bg-[#0a66c2] px-2 py-0.5 rounded cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKeyInput(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 px-1"
                  >
                    ✕
                  </button>
                </form>
              )}
              <button
                onClick={onOpenSettings}
                className="text-[#0a66c2] hover:underline font-semibold cursor-pointer"
              >
                Settings ⚙️
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {activeThread.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isError = msg.provider === 'featherless-error' || msg.provider === 'no-key';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#0a66c2] text-white rounded-br-xs'
                        : isError
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 rounded-bl-xs shadow-2xs font-mono text-[11px]'
                        : 'bg-white text-slate-800 border border-[#e0dfdc] rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 px-1">
                    <span className="text-[10px] text-slate-400">
                      {msg.timestamp}
                    </span>
                    {!isUser && msg.provider && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        msg.provider === 'featherless'
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                          : msg.provider === 'featherless-error'
                          ? 'text-red-700 bg-red-50 border border-red-200'
                          : 'text-slate-600 bg-slate-100'
                      }`}>
                        {msg.provider === 'featherless' ? '⚡ Featherless AI Live' : msg.provider === 'featherless-error' ? '⚠️ Featherless Error' : '🤖 Recruiter AI'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Recruiter Typing Indicator */}
            {isRecruiterTyping && (
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 w-fit shadow-2xs animate-pulse">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-500 font-medium ml-1">
                  {activeThread.recruiter.name} is thinking with Featherless AI...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Demand Buttons */}
          <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wide">
              Quick Demands:
            </span>
            <button
              onClick={() => sendQuickDemand("Can you beat an offer of $1.4M TC?")}
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-[#ebf4fd] hover:text-[#0a66c2] px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              "Can you beat $1.4M?"
            </button>
            <button
              onClick={() => sendQuickDemand("I will only accept if I get 100% remote work and 4-day work weeks.")}
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-[#ebf4fd] hover:text-[#0a66c2] px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              "Remote + 4-Day Work Week"
            </button>
            <button
              onClick={() => sendQuickDemand("Send me the formal offer letter on company letterhead.")}
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-[#ebf4fd] hover:text-[#0a66c2] px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              "Send the DocuSign"
            </button>
            <button
              onClick={() => sendQuickDemand("I need a dedicated cluster of 10,000 H100s for my independent projects.")}
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-[#ebf4fd] hover:text-[#0a66c2] px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              "Demand 10k GPUs"
            </button>
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e0dfdc] flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Write a message to ${activeThread.recruiter.name} (Featherless AI responds live)...`}
              className="flex-1 bg-[#edf3f8] text-xs sm:text-sm text-slate-900 placeholder-slate-400 px-4 py-2.5 rounded-full focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#0a66c2] border border-transparent"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                inputText.trim()
                  ? 'bg-[#0a66c2] text-white hover:bg-[#004182] shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
          Select a recruiter conversation to reply
        </div>
      )}
    </div>
  );
};
