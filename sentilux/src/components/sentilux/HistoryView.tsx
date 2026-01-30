import { Trash2, Database } from 'lucide-react';
import { SentimentResult } from '@/types/sentiment';

interface HistoryViewProps {
  history: SentimentResult[];
  onClearHistory: () => void;
  onNavigateToDashboard: () => void;
}

export const HistoryView = ({ history, onClearHistory, onNavigateToDashboard }: HistoryViewProps) => {
  return (
    <div className="space-y-8 slide-in-from-left-12 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Archive Vault</h2>
          <p className="text-sm font-medium text-muted-foreground mt-1">
            Review previously analyzed text segments
          </p>
        </div>
        <button 
          onClick={onClearHistory} 
          disabled={history.length === 0}
          className={`w-full sm:w-auto px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border border-white shadow-sm flex items-center justify-center gap-3 ${
            history.length === 0 
              ? 'bg-muted text-muted-foreground/50 border-transparent cursor-not-allowed' 
              : 'bg-white/40 text-sentilux-rose-200 hover:bg-sentilux-rose-50'
          }`}
        >
          <Trash2 size={16} /> Clear Archives
        </button>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel py-32 rounded-[3.5rem] text-center border-white/60 border-dashed border-4 bg-transparent">
          <Database className="mx-auto text-muted-foreground/30 mb-6" size={80} />
          <p className="text-muted-foreground/50 font-black uppercase tracking-widest text-sm mb-4">
            Your vault is currently empty
          </p>
          <button 
            onClick={onNavigateToDashboard}
            className="px-6 py-3 bg-sentilux-indigo-100 text-sentilux-indigo-900 font-black text-[10px] uppercase rounded-full shadow-sm"
          >
            Analyze Something
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((h) => (
            <div 
              key={h.id} 
              className="glass-panel p-8 rounded-[2.5rem] border border-white hover:shadow-md transition-all border-l-8 border-l-sentilux-indigo-100"
            >
              <p className="text-xs text-muted-foreground font-bold mb-6 line-clamp-3">"{h.text}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                  {h.analyses.map((a, i) => (
                    <div 
                      key={i} 
                      title={`${a.provider}: ${a.sentiment}`} 
                      className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-[9px] font-black text-white shadow-sm ${
                        a.sentiment === 'Positive' 
                          ? 'bg-sentilux-emerald-200' 
                          : a.sentiment === 'Negative' 
                            ? 'bg-sentilux-rose-200' 
                            : 'bg-sentilux-indigo-200'
                      }`}
                    >
                      {a.sentiment[0]}
                    </div>
                  ))}
                </div>
                <span className="text-[9px] font-black text-muted-foreground/50 uppercase">
                  {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
