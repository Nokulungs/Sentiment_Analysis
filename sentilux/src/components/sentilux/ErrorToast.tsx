import { AlertTriangle, X } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export const ErrorToast = ({ message, onClose }: ErrorToastProps) => {
  return (
    <div className="fixed bottom-6 right-6 left-6 sm:left-auto flex items-center gap-4 bg-sentilux-rose-50/90 backdrop-blur-xl text-destructive px-8 py-5 rounded-[2rem] shadow-lg border border-sentilux-rose-100 z-[110] slide-in-from-bottom-6">
      <AlertTriangle size={24} className="text-sentilux-rose-200" />
      <p className="font-bold text-sm tracking-tight">{message}</p>
      <button onClick={onClose} className="ml-auto hover:bg-sentilux-rose-100 p-2 rounded-full transition-colors">
        <X size={20} />
      </button>
    </div>
  );
};
