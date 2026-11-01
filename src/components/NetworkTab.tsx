import React from 'react';
import { Check, X, UserPlus, ShieldCheck, Sparkles, Building2, Users } from 'lucide-react';
import { ConnectionRequest, Recruiter } from '../types';

interface NetworkTabProps {
  connectionRequests: ConnectionRequest[];
  onAcceptConnection: (requestId: string) => void;
  onIgnoreConnection: (requestId: string) => void;
  onConnectVIP: (name: string, company: string) => void;
  connectionsCount: number;
}

const VIP_SUGGESTIONS = [
  {
    name: 'Jensen Huang',
    title: 'Founder & CEO at NVIDIA',
    company: 'NVIDIA',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    mutual: 412
  },
  {
    name: 'Sam Altman',
    title: 'CEO at OpenAI',
    company: 'OpenAI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    mutual: 388
  },
  {
    name: 'Demis Hassabis',
    title: 'CEO & Co-founder at Google DeepMind',
    company: 'Google DeepMind',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mutual: 320
  },
  {
    name: 'Dario Amodei',
    title: 'CEO & Co-founder at Anthropic',
    company: 'Anthropic',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    mutual: 295
  }
];

export const NetworkTab: React.FC<NetworkTabProps> = ({
  connectionRequests,
  onAcceptConnection,
  onIgnoreConnection,
  onConnectVIP,
  connectionsCount
}) => {
  const pendingRequests = connectionRequests.filter((r) => r.status === 'pending');

  return (
    <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-5">
      {/* Left Column: Network Summary & Management */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3">
        <div className="bg-white rounded-lg border border-[#e0dfdc] p-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 mb-2">Manage my network</h3>
          <div className="flex flex-col gap-2.5 text-xs text-slate-600">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500" />
                <span>Connections</span>
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                {connectionsCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>Companies Competing</span>
              </span>
              <span className="font-bold text-emerald-600 tabular-nums">18 Giants</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Acceptance Rate</span>
              </span>
              <span className="font-bold text-slate-900">100% VIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Pending Invitations & People You May Know */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Invitations Box */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e0dfdc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-900">
                Invitations ({pendingRequests.length})
              </h2>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                All High-Priority Recruiters
              </span>
            </div>
            <span className="text-xs text-slate-500">Fast-track direct hiring</span>
          </div>

          {pendingRequests.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {pendingRequests.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-start gap-3.5 flex-1">
                    <img
                      src={req.recruiter.avatar}
                      alt={req.recruiter.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-blue-100"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">
                          {req.recruiter.name}
                        </span>
                        <span className="text-xs">{req.recruiter.companyLogo}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0a66c2]" />
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        {req.recruiter.title} @ <strong className="text-slate-800">{req.recruiter.company}</strong>
                      </p>

                      {/* Recruiter's personalized urgent message */}
                      <div className="mt-2 p-2.5 bg-blue-50/70 border border-blue-100 rounded-md text-xs text-slate-700 italic">
                        "{req.note}"
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>{req.timestamp}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                          Pre-approved offer: {req.recruiter.initialOffer.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => onIgnoreConnection(req.id)}
                      className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => onAcceptConnection(req.id)}
                      className="px-5 py-1.5 text-xs font-bold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-full shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept & Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              All invitations accepted! You are now connected with every major Big Tech recruiter.
            </div>
          )}
        </div>

        {/* People You May Know / Tech VIPs */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900">
              Tech Industry Leaders Eager to Connect
            </h3>
            <span className="text-xs text-[#0a66c2] font-semibold">See all</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VIP_SUGGESTIONS.map((vip) => (
              <div
                key={vip.name}
                className="p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 hover:border-[#0a66c2]/40 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={vip.avatar}
                    alt={vip.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{vip.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{vip.title}</p>
                    <span className="text-[10px] text-slate-400">
                      {vip.mutual} mutual connections
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onConnectVIP(vip.name, vip.company)}
                  className="flex items-center gap-1 text-xs font-bold text-[#0a66c2] hover:bg-[#ebf4fd] border border-[#0a66c2] px-3 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
