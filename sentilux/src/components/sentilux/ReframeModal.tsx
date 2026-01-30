import { Wand2, X, Copy } from 'lucide-react';

interface ReframeModalProps {
  text: string;
  isImproving: boolean;
  suggestion: {
    improvedText: string;
    wordChanges: { original: string; suggested: string }[];
    reasoning: string;
  } | null;
  onClose: () => void;
}

export const ReframeModal = ({ text, isImproving, suggestion, onClose }: ReframeModalProps) => {
  const handleCopy = () => {
    if (suggestion) {
      navigator.clipboard.writeText(suggestion.improvedText);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-sentilux-indigo-900/10 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white relative z-10 zoom-in-95">
        <div className="absolute top-0 right-0 p-8">
          <button onClick={onClose} className="p-3 hover:bg-muted rounded-2xl transition-colors">
            <X size={22} className="text-muted-foreground/50" />
          </button>
        </div>
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-sentilux-indigo-100 to-sentilux-indigo-200 text-sentilux-indigo-900 rounded-3xl flex items-center justify-center">
            <Wand2 size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-foreground">Reframe Tone</h3>
            <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest mt-1">
              AI Guided Polish
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white/40 p-6 rounded-[2rem] border border-white">
            <label className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest block mb-4">
              ORIGINAL TEXT
            </label>
            <p className="text-sm font-semibold text-muted-foreground italic leading-relaxed">"{text}"</p>
          </div>
          
          {isImproving ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-[6px] border-sentilux-indigo-50 border-t-sentilux-indigo-200 rounded-full animate-spin mb-6"></div>
              <p className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-widest animate-pulse">
                Softening the language...
              </p>
            </div>
          ) : suggestion ? (
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-sentilux-emerald-200 uppercase tracking-widest block mb-4">
                  REFINED VERSION
                </label>
                <div className="bg-sentilux-emerald-50/30 p-6 rounded-[2.5rem] border border-sentilux-emerald-100 relative group">
                  <p className="text-lg font-black text-sentilux-emerald-800 leading-relaxed pr-10">
                    "{suggestion.improvedText}"
                  </p>
                  <button 
                    onClick={handleCopy} 
                    className="absolute top-6 right-6 text-sentilux-emerald-200 hover:text-sentilux-emerald-800 transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
              <div className="bg-sentilux-indigo-50/30 p-6 rounded-[2rem] border border-white">
                <p className="text-[11px] font-bold text-sentilux-indigo-900 leading-relaxed italic">
                  <span className="not-italic font-black text-sentilux-indigo-200 uppercase mr-2 tracking-widest">
                    Logic:
                  </span>
                  {suggestion.reasoning}
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="w-full py-5 bg-sentilux-indigo-100 text-sentilux-indigo-900 font-black text-xs uppercase rounded-3xl hover:bg-sentilux-indigo-200 transition-all border border-white shadow-sm"
              >
                Done & Dismiss
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
