import React from 'react';
import { Bookmark, Users, Eye, TrendingUp, Sparkles, CheckCircle2, Edit3, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface LeftSidebarProps {
  userProfile: UserProfile;
  onEditProfile: () => void;
  onToggleOpenToWork: () => void;
  onViewOffers: () => void;
  offersCount?: number;
  topOfferSummary?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  userProfile,
  onEditProfile,
  onToggleOpenToWork,
  onViewOffers,
  offersCount = 9,
  topOfferSummary = 'Highest: $1.95M TC (Citadel) · Negotiate ➔'
}) => {
  return (
    <aside className="w-full lg:w-[260px] shrink-0 flex flex-col gap-3">
      {/* User Identity Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="relative h-18 sm:h-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 overflow-hidden">
          {userProfile.coverImage ? (
            <img
              src={userProfile.coverImage}
              alt="Cover"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
          ) : (
            <div className="w-full h-full bg-slate-800" />
          )}
          <button
            onClick={onEditProfile}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-700 p-1 rounded-full shadow-xs transition-colors"
            title="Edit profile"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Avatar & Info */}
        <div className="px-4 pb-4 pt-0 text-center relative">
          <div className="relative -mt-10 mb-2 inline-block">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                referrerPolicy="no-referrer"
                className="w-18 h-18 rounded-full object-cover ring-3 ring-emerald-500 bg-white shadow-md mx-auto"
              />
              {/* #OpenToWork Badge Ring */}
              <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-tight">
                #OpenToWork
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <h3 className="font-bold text-slate-900 text-base hover:underline cursor-pointer" onClick={onEditProfile}>
              {userProfile.name}
            </h3>
            <span title="Verified Tech Luminary">
              <ShieldCheck className="w-4 h-4 text-[#0a66c2]" />
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {userProfile.headline}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {userProfile.location}
          </p>
        </div>

        {/* In-Demand Status Badge */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-b border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[11px] font-bold text-amber-900">Talent Status:</span>
          </div>
          <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
            🔥 Desperately Sought
          </span>
        </div>

        {/* Profile Analytics */}
        <div className="px-4 py-3 border-b border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-slate-600 hover:bg-slate-50 p-1 -mx-1 rounded cursor-pointer transition-colors">
            <div>
              <span className="font-medium text-slate-500 block text-[11px]">Profile viewers</span>
              <span className="text-[10px] text-emerald-600 font-semibold">+842% this week</span>
            </div>
            <span className="font-bold text-slate-900 tabular-nums">
              {userProfile.profileViews.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 hover:bg-slate-50 p-1 -mx-1 rounded cursor-pointer transition-colors">
            <div>
              <span className="font-medium text-slate-500 block text-[11px]">Post impressions</span>
              <span className="text-[10px] text-blue-600 font-semibold">Top 0.01% in Tech</span>
            </div>
            <span className="font-bold text-slate-900 tabular-nums">
              {userProfile.postImpressions.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 hover:bg-slate-50 p-1 -mx-1 rounded cursor-pointer transition-colors">
            <div>
              <span className="font-medium text-slate-500 block text-[11px]">Search appearances</span>
              <span className="text-[10px] text-purple-600 font-semibold">100% Big Tech Execs</span>
            </div>
            <span className="font-bold text-slate-900 tabular-nums">
              {userProfile.searchAppearances.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 1-Click Offer Vault Link */}
        <div className="p-3 bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer" onClick={onViewOffers}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-800 block truncate">
                Active Bidding War ({offersCount} Offers)
              </span>
              <span className="text-[11px] text-[#0a66c2] font-semibold truncate block">
                {topOfferSummary}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Open to Work Controller Box */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-900">#OpenToWork Radar</span>
          <button
            onClick={onToggleOpenToWork}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              userProfile.openToWork ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
            title="Toggle Open To Work broadcast to recruiters"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                userProfile.openToWork ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          {userProfile.openToWork
            ? 'Broadcast active: 48 Big Tech talent partners are actively alerted whenever you breathe.'
            : 'Stealth mode active: Recruiters are still messaging you because your reputation is too huge.'}
        </p>
      </div>

      {/* Top Endorsed Skills */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] p-3.5 shadow-xs hidden lg:block">
        <h4 className="text-xs font-bold text-slate-900 mb-2.5">
          Top Endorsed Skills
        </h4>
        <div className="flex flex-col gap-2">
          {userProfile.skills.slice(0, 5).map((skill, index) => (
            <div key={skill} className="flex items-center justify-between text-xs text-slate-700">
              <span className="truncate pr-2">{skill}</span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                {90 - index * 6} endorsements
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
