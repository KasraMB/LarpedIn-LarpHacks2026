import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, UserPlus, MessageCircle } from 'lucide-react';
import { Recruiter } from '../types';

interface RightSidebarProps {
  recruiters: Recruiter[];
  onOpenMessageWithRecruiter: (recruiter: Recruiter) => void;
  onConnectWithRecruiter: (recruiter: Recruiter) => void;
  userName: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  recruiters,
  onOpenMessageWithRecruiter,
  onConnectWithRecruiter,
  userName
}) => {
  const firstName = userName.split(' ')[0] || 'Alex';

  const newsItems = [
    {
      title: `${firstName} sparks Silicon Valley bidding frenzy`,
      readers: '64,821 readers',
      time: '1h ago',
      hot: true
    },
    {
      title: 'Remote Staff Architect comp crosses $1.6M',
      readers: '38,190 readers',
      time: '3h ago',
      hot: true
    },
    {
      title: 'OpenAI & DeepMind double executive sign-on bonuses',
      readers: '22,410 readers',
      time: '5h ago',
      hot: false
    },
    {
      title: 'Tech recruiters admit: "We fight over the top 0.01%"',
      readers: '19,530 readers',
      time: '8h ago',
      hot: false
    },
    {
      title: 'Meta waives all coding loops for top infra leaders',
      readers: '14,280 readers',
      time: '12h ago',
      hot: false
    }
  ];

  return (
    <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-3">
      {/* LinkedOut News Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-sm text-slate-900">LinkedOut News</h3>
            <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
              LIVE
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Top tech stories</span>
        </div>

        <div className="flex flex-col gap-3">
          {newsItems.map((news, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400 text-xs font-bold shrink-0 mt-0.5">•</span>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-[#0a66c2] group-hover:underline leading-snug">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <span>{news.time}</span>
                    <span>·</span>
                    <span className="tabular-nums">{news.readers}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiters Desperately Trying To Hire You */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span>Desperate To Hire You</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </h3>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
            Pre-Approved
          </span>
        </div>

        <div className="flex flex-col gap-3.5">
          {recruiters.slice(0, 3).map((rec) => (
            <div key={rec.id} className="flex items-start gap-2.5 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
              <img
                src={rec.avatar}
                alt={rec.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-slate-900 truncate">{rec.name}</span>
                  <span className="text-xs shrink-0">{rec.companyLogo}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate leading-tight">{rec.title}</p>
                <p className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-1">
                  Offer: {rec.initialOffer.split('(')[0]}
                </p>

                <div className="flex items-center gap-1.5 mt-2">
                  <button
                    onClick={() => onOpenMessageWithRecruiter(rec)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#0a66c2] hover:bg-[#ebf4fd] border border-[#0a66c2] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => onConnectWithRecruiter(rec)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ego-Boosting Ad Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-lg p-4 text-white shadow-xs">
        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 block mb-1">
          Silicon Valley Talent Radar
        </span>
        <h4 className="text-xs font-bold leading-snug">
          You are currently in the 99.9th percentile of market demand.
        </h4>
        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
          Average recruiter turnaround for your profile: <strong className="text-white">12 seconds</strong>.
        </p>
      </div>

      {/* Quiet Footer Links */}
      <div className="text-[11px] text-slate-400 text-center flex flex-wrap justify-center gap-x-2 gap-y-1 px-2 pt-1">
        <span>About</span>
        <span>·</span>
        <span>Accessibility</span>
        <span>·</span>
        <span>Privacy & Terms</span>
        <span>·</span>
        <span>Ad Choices</span>
        <span>·</span>
        <span>LinkedOut Corporation © 2026</span>
      </div>
    </aside>
  );
};
