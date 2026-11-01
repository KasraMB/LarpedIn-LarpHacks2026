import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Maximize2,
  DollarSign
} from 'lucide-react';
import { ChatThread, Recruiter, UserProfile, FeatherlessConfig } from '../types';

interface DockedChatProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onCloseDock: () => void;
  onSendMessage: (threadId: string, text: string) => void;
  userProfile: UserProfile;
  featherlessConfig: FeatherlessConfig;
  onOpenFullMessaging: () => void;
  isRecruiterTyping: boolean;
}

const QUICK_PROMPTS = [
  "Can you beat $1.2M?",
  "100% remote guaranteed?",
  "Send the DocuSign right now.",
  "I only write Rust."
];

export const DockedChat: React.FC<DockedChatProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onCloseDock,
  onSendMessage,
  userProfile,
  featherlessConfig,
  onOpenFullMessaging,
  isRecruiterTyping
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const totalUnread = threads.reduce((acc, t) => acc + t.unreadCount, 0);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, activeThread?.messages.length, isRecruiterTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!activeThread) return;
    onSendMessage(activeThread.id, prompt);
  };

  return (
    <div className="fixed bottom-0 right-4 z-40 flex items-end gap-2">
      {/* Main Dock Container */}
      <div className={`w-80 sm:w-96 bg-white rounded-t-xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
        isOpen ? 'h-[460px]' : 'h-11'
      }`}>
        {/* Dock Header */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="h-11 bg-white hover:bg-slate-50 border-b border-slate-200 px-3.5 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={activeThread ? activeThread.recruiter.avatar : userProfile.avatar}
                alt="Chat"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-slate-900 truncate max-w-[130px]">
                {isOpen ? activeThread?.recruiter.name : 'Messaging'}
              </span>
              {totalUnread > 0 && !isOpen && (
                <span className="bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {totalUnread}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            {isOpen && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFullMessaging();
                }}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
                title="Open in full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dock Content when open */}
        {isOpen && (
          <div className="flex-1 flex flex-col h-[calc(460px-44px)] bg-slate-50">
            {/* Thread selector strip */}
            <div className="bg-white border-b border-slate-200 px-2 py-1.5 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectThread(t.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    t.id === activeThread?.id
                      ? 'bg-[#0a66c2] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{t.recruiter.companyLogo}</span>
                  <span>{t.recruiter.name.split(' ')[0]}</span>
                  {t.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                      {t.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Recruiter info banner */}
            {activeThread && (
              <div className="bg-blue-50/70 border-b border-blue-100 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-700 shrink-0">
                <span className="truncate pr-2">
                  <strong>{activeThread.recruiter.company}</strong> · {activeThread.recruiter.title}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded shrink-0">
                  {activeThread.recruiter.initialOffer.split('(')[0]}
                </span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5">
              {activeThread?.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#0a66c2] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 px-1">
                      <span className="text-[10px] text-slate-400">
                        {msg.timestamp}
                      </span>
                      {!isUser && msg.provider && (
                        <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded">
                          {msg.provider === 'featherless' ? '⚡ Featherless' : msg.provider === 'gemini' ? '✨ Gemini' : '🤖 AI'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isRecruiterTyping && (
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 w-fit shadow-2xs animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-slate-500 font-medium ml-1">
                    {activeThread?.recruiter.name.split(' ')[0]} is frantically typing...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick reply prompt pills */}
            <div className="px-2.5 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-[10px] font-semibold text-slate-600 bg-slate-100 hover:bg-[#ebf4fd] hover:text-[#0a66c2] px-2 py-0.5 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSend} className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Reply to ${activeThread?.recruiter.name.split(' ')[0]}...`}
                className="flex-1 bg-slate-100 text-xs text-slate-800 placeholder-slate-400 px-3 py-1.5 rounded-full focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-[#0a66c2] border border-transparent"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  inputText.trim()
                    ? 'bg-[#0a66c2] text-white hover:bg-[#004182]'
                    : 'text-slate-300'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
