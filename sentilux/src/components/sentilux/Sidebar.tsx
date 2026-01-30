import { Sparkles, LayoutDashboard, BarChart4, History, BookOpen, X, Menu } from 'lucide-react';
import { ActiveTab } from '@/types/sentiment';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  showGuide: boolean;
  setShowGuide: (show: boolean) => void;
}

const navItems: { id: ActiveTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'insights', label: 'Analytics Pro', icon: BarChart4 },
  { id: 'history', label: 'Archives', icon: History }
];

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setIsSidebarOpen,
  showGuide,
  setShowGuide
}: SidebarProps) => {
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 glass-panel z-50 border-b border-white/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-sentilux-pink-200 via-sentilux-purple-100 to-sentilux-indigo-200 rounded-xl flex items-center justify-center text-sentilux-indigo-900 shadow-md">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-black text-foreground">Sentilux</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2.5 bg-white/60 rounded-xl text-muted-foreground shadow-sm border border-white"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-0 z-50 md:relative md:flex md:w-72 md:z-30 m-0 md:m-4 transition-all duration-500 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-full w-full glass-panel md:rounded-[2.5rem] border-r md:border border-white/60 shadow-xl flex flex-col p-6 md:p-8">
          {/* Logo - Desktop */}
          <div className="hidden md:flex items-center gap-4 mb-14">
            <div className="w-12 h-12 bg-gradient-to-tr from-sentilux-pink-200 via-sentilux-purple-100 to-sentilux-indigo-200 rounded-2xl flex items-center justify-center text-sentilux-indigo-900 shadow-sm">
              <Sparkles size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-foreground leading-none">Sentilux</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Pastel Insights</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-3 flex-1">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.8rem] text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-white shadow-sm border border-sentilux-indigo-100 text-sentilux-indigo-900' 
                    : 'text-muted-foreground hover:bg-white/70 hover:text-foreground'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={activeTab === item.id ? 'text-sentilux-indigo-400' : 'text-muted-foreground/50'} 
                />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Help Button */}
          <div className="mt-auto pt-8 border-t border-white/40 hidden md:block">
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/40 rounded-2xl text-xs font-bold text-muted-foreground hover:bg-white/60 border border-white transition-all"
            >
              <BookOpen size={16} /> Help Center
            </button>
          </div>
        </div>
        
        {/* Mobile Overlay */}
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="md:hidden absolute inset-0 bg-foreground/5 backdrop-blur-sm -z-10 h-screen w-screen" 
        />
      </aside>
    </>
  );
};
