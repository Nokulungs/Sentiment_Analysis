import { Cpu, HelpCircle } from 'lucide-react';
import { ProviderType } from '@/types/sentiment';

interface HeaderProps {
  selectedProvider: ProviderType;
  setSelectedProvider: (provider: ProviderType) => void;
  isLoading: boolean;
  setShowGuide: (show: boolean) => void;
}

const providers: ProviderType[] = ['flash', 'pro', 'compare'];

export const Header = ({ 
  selectedProvider, 
  setSelectedProvider, 
  isLoading,
  setShowGuide 
}: HeaderProps) => {
  return (
    <header className="glass-panel border-white/60 rounded-[1.8rem] md:rounded-[2.5rem] px-5 md:px-10 py-4 mb-8 sticky top-0 z-40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-muted/20">
      {/* Provider Selector */}
      <div className="flex items-center gap-2 bg-white/40 p-1.5 rounded-2xl w-full sm:w-auto border border-white">
        {providers.map(p => (
          <button 
            key={p}
            onClick={() => setSelectedProvider(p)}
            className={`flex-1 sm:flex-none px-6 py-2 text-[11px] md:text-xs font-black rounded-xl transition-all capitalize ${
              selectedProvider === p 
                ? 'bg-sentilux-indigo-100 text-sentilux-indigo-900 shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      
      {/* Status & Help */}
      <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/30 px-4 py-2 rounded-full border border-white">
          <Cpu size={14} className={isLoading ? 'animate-spin' : ''} />
          {isLoading ? 'Processing...' : `Mode: ${selectedProvider}`}
        </div>
        <div className="h-10 w-[1px] bg-muted/50 hidden sm:block"></div>
        <button 
          onClick={() => setShowGuide(true)} 
          className="p-3 glass-panel rounded-2xl text-muted-foreground/50 hover:text-sentilux-indigo-400 transition-all border border-white"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};
