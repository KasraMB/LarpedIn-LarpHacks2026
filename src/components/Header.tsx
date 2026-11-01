import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  DollarSign, 
  Search, 
  Settings, 
  Sparkles, 
  UserCheck,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, FeatherlessConfig } from '../types';

interface HeaderProps {
  activeTab: 'feed' | 'network' | 'jobs' | 'messaging' | 'notifications' | 'offers';
  setActiveTab: (tab: 'feed' | 'network' | 'jobs' | 'messaging' | 'notifications' | 'offers') => void;
  userProfile: UserProfile;
  unreadMessagesCount: number;
  unreadNotifsCount: number;
  pendingInvitesCount: number;
  pendingOffersCount: number;
  onOpenSettings: () => void;
  onOpenProfileEdit: () => void;
  featherlessConfig: FeatherlessConfig;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  unreadMessagesCount,
  unreadNotifsCount,
  pendingInvitesCount,
  pendingOffersCount,
  onOpenSettings,
  onOpenProfileEdit,
  featherlessConfig
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e0dfdc] shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Left Section: Brand Logo & Global Search */}
        <div className="flex items-center gap-2 flex-1 max-w-[420px]">
          {/* Authentic LinkedIn Style Logo */}
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-1.5 shrink-0 group text-left cursor-pointer focus:outline-hidden"
            title="LarpedIn Home"
          >
            <div className="w-8.5 h-8.5 bg-[#0a66c2] rounded-md flex items-center justify-center font-bold text-white text-xl tracking-tighter shadow-xs group-hover:bg-[#004182] transition-colors">
              in
            </div>
            <span className="hidden sm:inline font-bold text-slate-800 text-base tracking-tight">
              Larped<span className="text-[#0a66c2]">In</span>
            </span>
          </button>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, skills, recruiters..."
              className="w-full bg-[#edf3f8] text-slate-800 placeholder-slate-500 pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-md focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0a66c2] border border-transparent focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Center / Right: Navigation Bar Icons */}
        <nav className="flex items-center gap-1 sm:gap-2 lg:gap-5 shrink-0">
          {/* Home / Feed */}
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] h-13 px-1 transition-colors relative cursor-pointer ${
              activeTab === 'feed'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] leading-none hidden sm:inline">Home</span>
          </button>

          {/* My Network */}
          <button
            onClick={() => setActiveTab('network')}
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] h-13 px-1 transition-colors relative cursor-pointer ${
              activeTab === 'network'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Users className="w-5 h-5 mb-0.5" />
              {pendingInvitesCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {pendingInvitesCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-none hidden sm:inline">My Network</span>
          </button>

          {/* Jobs */}
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] h-13 px-1 transition-colors relative cursor-pointer ${
              activeTab === 'jobs'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Briefcase className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-1.5 -right-2 bg-[#0a66c2] text-white text-[10px] font-bold px-1 py-0.2 rounded-full min-w-4 text-center">
                42
              </span>
            </div>
            <span className="text-[11px] leading-none hidden sm:inline">Jobs</span>
          </button>

          {/* Messaging */}
          <button
            onClick={() => setActiveTab('messaging')}
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] h-13 px-1 transition-colors relative cursor-pointer ${
              activeTab === 'messaging'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 mb-0.5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-none hidden sm:inline">Messaging</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] h-13 px-1 transition-colors relative cursor-pointer ${
              activeTab === 'notifications'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Bell className="w-5 h-5 mb-0.5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {unreadNotifsCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-none hidden sm:inline">Notifications</span>
          </button>

          {/* 7-Figure Offers Vault */}
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[56px] h-13 px-1 transition-colors relative cursor-pointer ${
              activeTab === 'offers'
                ? 'text-[#0a66c2] border-b-2 border-[#0a66c2] font-semibold'
                : 'text-slate-600 hover:text-[#0a66c2]'
            }`}
            title="Review formal offer letters from Big Tech"
          >
            <div className="relative">
              <DollarSign className="w-5 h-5 mb-0.5 text-amber-600" />
              {pendingOffersCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-600 text-white text-[10px] font-bold px-1 py-0.2 rounded-full min-w-4 text-center">
                  {pendingOffersCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-none hidden sm:inline font-semibold text-amber-700">Offers</span>
          </button>

          <div className="h-8 w-px bg-slate-200 hidden md:block my-auto mx-1" />

          {/* Profile / Me Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex flex-col items-center justify-center h-13 px-1 cursor-pointer text-slate-600 hover:text-slate-900"
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
              </div>
              <span className="text-[11px] leading-none mt-0.5 hidden sm:inline">Me ▾</span>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-13 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-3 px-3 z-50 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{userProfile.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{userProfile.headline}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      #OpenToWork
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenProfileEdit();
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs font-semibold text-[#0a66c2] hover:bg-[#ebf4fd] rounded transition-colors"
                  >
                    Edit Profile Details & Skills
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab('offers');
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors flex items-center justify-between"
                  >
                    <span>View 7-Figure Offers</span>
                    <span className="font-bold text-emerald-600">$1.6M Max</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors flex items-center justify-between"
                  >
                    <span>AI Model & Attention Settings</span>
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Featherless AI / Model Indicator & Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 cursor-pointer shrink-0"
            title="Configure Featherless AI Model & Attention Bombardment"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0a66c2]" />
            <span className="hidden xl:inline text-[11px] font-semibold text-slate-800">
              {featherlessConfig.apiKey ? 'Featherless AI Active' : 'AI Recruiter Engine'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </nav>
      </div>
    </header>
  );
};
