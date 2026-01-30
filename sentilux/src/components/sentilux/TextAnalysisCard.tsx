import { FileText, PlayCircle, Send, Cpu, Info } from 'lucide-react';

interface TextAnalysisCardProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: () => void;
  onInsertExample: () => void;
  isLoading: boolean;
}

export const TextAnalysisCard = ({ 
  inputText, 
  setInputText, 
  onAnalyze, 
  onInsertExample,
  isLoading 
}: TextAnalysisCardProps) => {
  return (
    <div className="xl:col-span-3 glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-lg relative overflow-hidden group border border-white flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-3">
          <FileText size={28} className="text-sentilux-indigo-200 fill-sentilux-indigo-100" /> 
          Text Analysis
        </h3>
        <button 
          onClick={onInsertExample}
          className="px-4 py-2 bg-white/50 text-[10px] font-black uppercase text-muted-foreground border border-white rounded-xl hover:text-sentilux-indigo-400 transition-all flex items-center gap-2"
        >
          <PlayCircle size={14} /> Try Example
        </button>
      </div>
      
      <div className="relative flex-1">
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Share a thought for instant rephrasing..."
          className="w-full min-h-[220px] p-8 bg-white/40 border-2 border-transparent focus:border-sentilux-indigo-100 rounded-[2rem] text-lg font-semibold text-foreground resize-none outline-none transition-all placeholder:text-muted-foreground/40 shadow-inner"
        />
        <div className="absolute bottom-6 right-6">
          <button 
            onClick={onAnalyze}
            disabled={isLoading || !inputText.trim()}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95 ${
              isLoading || !inputText.trim() 
                ? 'bg-muted text-muted-foreground border border-transparent cursor-not-allowed' 
                : 'bg-sentilux-indigo-400 text-white hover:bg-sentilux-indigo-300 hover:shadow-sentilux-indigo-200'
            }`}
          >
            {isLoading ? (
              <>
                <Cpu size={18} className="animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Send size={18} /> Start Analyzing
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center px-2">
        <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest flex items-center gap-2">
          <Info size={12} /> Auto-analysis will trigger as you type
        </p>
        <span className="text-[10px] font-bold text-muted-foreground/50 uppercase">{inputText.length} characters</span>
      </div>
    </div>
  );
};
