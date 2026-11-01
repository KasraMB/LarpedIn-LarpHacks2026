import React, { useState } from 'react';
import { X, Image, Video, Calendar, Sparkles, Smile, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (content: string) => void;
  userProfile: UserProfile;
}

const TEMPLATES = [
  'Just rejected an $850k offer from a stealth AI lab because they refused to let me work 100% remote from my cabin. Know your worth, engineers. 🚀',
  'Excited to announce I just shaved 42ms off our distributed consensus p99 latency by rewriting the replication layer in bare-metal Rust. Benchmark details coming soon.',
  'Hot take: If your company requires 5 rounds of LeetCode for a Staff Architect who has designed systems processing petabytes per second, you don’t deserve senior engineering talent.',
  'Taking a quick 2-week vacation to build an open-source distributed model sharding engine for fun. What are your favorite CUDA kernel hacks?'
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  userProfile
}) => {
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitPost(content.trim());
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-slate-900">{userProfile.name}</span>
                <ShieldCheck className="w-4 h-4 text-[#0a66c2]" />
              </div>
              <span className="text-xs text-slate-500">Post to Anyone · Public (Big Tech Recruiters Watching)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to talk about? (Recruiters will instantly swarm your comments!)"
            rows={5}
            className="w-full text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-hidden leading-relaxed"
            autoFocus
          />

          {/* Quick Pre-filled Inspiration Pills */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>In-Demand Humblebrag Templates:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setContent(tmpl)}
                  className="text-left text-[11px] bg-slate-100 hover:bg-[#ebf4fd] hover:text-[#0a66c2] text-slate-700 px-2.5 py-1 rounded-md transition-colors truncate max-w-full"
                >
                  {tmpl.slice(0, 52)}...
                </button>
              ))}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <button type="button" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Add photo">
                <Image className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Add video">
                <Video className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Add event">
                <Calendar className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className={`px-5 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                  content.trim()
                    ? 'bg-[#0a66c2] text-white hover:bg-[#004182] shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
