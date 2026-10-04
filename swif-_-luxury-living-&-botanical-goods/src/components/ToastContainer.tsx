import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start space-x-3 p-3.5 bg-[#FDFCF7] border border-[#BAC7BE]/50 shadow-lg rounded-xs backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-[#5C7764] flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-[#7A9382] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs text-[#1C2620] leading-relaxed">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#9AAEA0] hover:text-[#1C2620] transition-colors p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
