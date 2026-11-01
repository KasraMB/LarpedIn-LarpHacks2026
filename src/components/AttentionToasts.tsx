import React from 'react';
import { X, Sparkles, DollarSign, Bell, Mail, Eye } from 'lucide-react';

export interface AttentionToastItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  actionText?: string;
  onClick?: () => void;
}

interface AttentionToastsProps {
  toasts: AttentionToastItem[];
  onDismiss: (id: string) => void;
}

export const AttentionToasts: React.FC<AttentionToastsProps> = ({
  toasts,
  onDismiss
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900/95 text-white backdrop-blur-md rounded-xl p-3.5 shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
            {toast.type === 'offer' ? (
              <DollarSign className="w-4 h-4 text-emerald-400" />
            ) : toast.type === 'inmail' ? (
              <Mail className="w-4 h-4 text-blue-400" />
            ) : toast.type === 'view' ? (
              <Eye className="w-4 h-4 text-purple-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400" />
            )}
          </div>

          <div className="flex-1 overflow-hidden pr-1">
            <h5 className="font-bold text-xs text-white leading-snug">{toast.title}</h5>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
              {toast.subtitle}
            </p>

            {toast.actionText && (
              <button
                onClick={() => {
                  if (toast.onClick) toast.onClick();
                  onDismiss(toast.id);
                }}
                className="mt-2 text-[11px] font-bold text-sky-400 hover:text-sky-300 underline cursor-pointer"
              >
                {toast.actionText} ➔
              </button>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-full transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
