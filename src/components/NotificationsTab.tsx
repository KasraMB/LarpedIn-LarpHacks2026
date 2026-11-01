import React, { useState } from 'react';
import { Bell, Eye, DollarSign, Award, TrendingUp, Mail, Check, Sparkles } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsTabProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNotificationAction: (item: NotificationItem) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
  notifications,
  onMarkAllAsRead,
  onNotificationAction
}) => {
  const [filter, setFilter] = useState<'all' | 'inmail' | 'offer' | 'view'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'inmail':
        return <Mail className="w-4 h-4 text-[#0a66c2]" />;
      case 'offer':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'endorse':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'view':
        return <Eye className="w-4 h-4 text-purple-600" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-[840px] mx-auto bg-white rounded-lg border border-[#e0dfdc] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-base text-slate-900">Notifications</h2>
          <p className="text-xs text-slate-500">Live stream of executive attention and recruiter activity</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('inmail')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'inmail' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              InMails
            </button>
            <button
              onClick={() => setFilter('offer')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'offer' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Offers
            </button>
            <button
              onClick={() => setFilter('view')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'view' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Views
            </button>
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-semibold text-[#0a66c2] hover:underline cursor-pointer px-2 py-1"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-slate-100">
        {filteredNotifs.map((item) => (
          <div
            key={item.id}
            onClick={() => onNotificationAction(item)}
            className={`p-4 flex items-start justify-between gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
              !item.read ? 'bg-[#ebf4fd]/50 border-l-4 border-l-[#0a66c2]' : ''
            }`}
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                {getIcon(item.type)}
              </div>

              <div className="overflow-hidden">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.subtitle}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 inline-block">
                  {item.timestamp}
                </span>
              </div>
            </div>

            {item.actionLabel && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNotificationAction(item);
                }}
                className="text-xs font-bold text-[#0a66c2] hover:bg-[#ebf4fd] border border-[#0a66c2] px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
              >
                {item.actionLabel}
              </button>
            )}
          </div>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  );
};
