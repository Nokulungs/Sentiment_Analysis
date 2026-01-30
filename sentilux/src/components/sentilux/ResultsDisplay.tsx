import { Wand2 } from 'lucide-react';
import { SentimentResult } from '@/types/sentiment';

interface ResultsDisplayProps {
  results: SentimentResult[];
  onImproveRequest: (id: string, text: string) => void;
}

export const ResultsDisplay = ({ results, onImproveRequest }: ResultsDisplayProps) => {
  return (
    <div className="lg:col-span-2 glass-panel p-8 rounded-[3rem] border border-white shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black text-foreground">Recent Insights</h3>
        <p className="text-[10px] font-black text-muted-foreground/50 uppercase">
          Showing {results.length} results
        </p>
      </div>
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
        {results.map(r => (
          <div key={r.id} className="p-6 bg-white/50 rounded-[2.5rem] border border-white shadow-sm hover:shadow-md transition-all">
            <p className="text-foreground font-bold mb-4">"{r.text}"</p>
            <div className={`grid gap-5 ${r.analyses.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {r.analyses.map((a, i) => (
                <div 
                  key={i} 
                  className={`p-5 rounded-[2rem] border-2 ${
                    a.sentiment === 'Positive' 
                      ? 'bg-sentilux-emerald-50/50 border-sentilux-emerald-100' 
                      : a.sentiment === 'Negative' 
                        ? 'bg-sentilux-rose-50/50 border-sentilux-rose-100' 
                        : 'bg-sentilux-indigo-50/50 border-sentilux-indigo-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        {a.provider}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[9px] font-black bg-white/50 border border-white shadow-sm">
                        {Math.round(a.confidence * 100)}% Match
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {a.sentiment === 'Negative' && (
                        <button 
                          onClick={() => onImproveRequest(r.id, r.text)} 
                          className="flex items-center gap-2 px-3 py-1 bg-sentilux-indigo-300 text-white rounded-xl text-[9px] font-black uppercase shadow-sm hover:bg-sentilux-indigo-400 transition-all"
                        >
                          <Wand2 size={12} /> Reframe
                        </button>
                      )}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                        a.sentiment === 'Positive' 
                          ? 'text-sentilux-emerald-800' 
                          : a.sentiment === 'Negative' 
                            ? 'text-destructive' 
                            : 'text-sentilux-indigo-900'
                      }`}>
                        {a.sentiment}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {a.keywords.map(kw => (
                      <span 
                        key={kw} 
                        className="px-3 py-1 bg-white/80 text-[9px] font-black text-muted-foreground rounded-lg border border-white shadow-sm"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal italic">
                    "{a.explanation}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
