import { Sparkles, X, Zap, Wand2, BarChart4 } from 'lucide-react';

interface WelcomeGuideProps {
  onClose: () => void;
}

export const WelcomeGuide = ({ onClose }: WelcomeGuideProps) => {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border-white bg-sentilux-indigo-50/30 border shadow-sm slide-in-from-top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-sentilux-indigo-900 flex items-center gap-2">
          <Sparkles size={20} /> Welcome to Sentilux
        </h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-sentilux-indigo-900/70 leading-relaxed mb-6">
        Analyze the emotion behind any text instantly. You can type directly, paste feedback, or upload a dataset. 
        Switch between <strong>Flash</strong> (fast), <strong>Pro</strong> (deep), or <strong>Compare</strong> (dual insights) using the top selector.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white/50 rounded-2xl border border-white text-center">
          <Zap size={18} className="mx-auto mb-2 text-sentilux-indigo-400" />
          <p className="text-[10px] font-black uppercase text-sentilux-indigo-900 mb-1">Analyze</p>
          <p className="text-[9px] text-muted-foreground">Type or paste text to see results</p>
        </div>
        <div className="p-4 bg-white/50 rounded-2xl border border-white text-center">
          <Wand2 size={18} className="mx-auto mb-2 text-sentilux-pink-300" />
          <p className="text-[10px] font-black uppercase text-sentilux-pink-300 mb-1">Reframe</p>
          <p className="text-[9px] text-muted-foreground">Turn negative text into constructive prose</p>
        </div>
        <div className="p-4 bg-white/50 rounded-2xl border border-white text-center">
          <BarChart4 size={18} className="mx-auto mb-2 text-sentilux-emerald-200" />
          <p className="text-[10px] font-black uppercase text-sentilux-emerald-800 mb-1">Visualize</p>
          <p className="text-[9px] text-muted-foreground">Explore trends in Analytics Pro</p>
        </div>
      </div>
    </div>
  );
};
