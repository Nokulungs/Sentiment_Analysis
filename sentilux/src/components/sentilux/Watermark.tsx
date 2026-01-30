import { MousePointer2, Github } from 'lucide-react';

export const Watermark = () => {
  return (
    <div className="fixed bottom-8 left-12 hidden xl:flex items-center gap-5 glass-panel px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 border-white/60 shadow-sm z-50">
      <div className="flex items-center gap-2">
        <MousePointer2 size={16} className="text-sentilux-indigo-200" />
        <span>Intelli-Sync Active</span>
      </div>
      <div className="w-[1px] h-4 bg-muted/30"></div>
      <div className="flex items-center gap-2 group cursor-pointer hover:text-sentilux-pink-300 transition-colors">
        <Github size={16} />
        <span>Sentilux v2.7.5 Stable</span>
      </div>
    </div>
  );
};
