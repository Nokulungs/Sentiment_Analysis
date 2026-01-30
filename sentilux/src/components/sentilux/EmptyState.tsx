import { Globe } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="glass-panel p-20 rounded-[3rem] border border-white border-dashed text-center">
      <Globe size={48} className="mx-auto text-muted-foreground/30 mb-4 animate-pulse" />
      <p className="text-sm font-black text-muted-foreground/50 uppercase tracking-widest">
        Waiting for input or click "Start Analyzing" to begin...
      </p>
    </div>
  );
};
