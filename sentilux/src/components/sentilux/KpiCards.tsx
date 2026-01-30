import { Activity, Target, ShieldCheck } from 'lucide-react';

interface KpiCardsProps {
  radialValue: number;
  historyLength: number;
}

const kpiConfig = [
  { label: 'Brand Positivity', icon: Activity, colorClass: 'bg-sentilux-pink-100', sub: 'Positive Lean' },
  { label: 'Model Certainty', value: '92%', icon: Target, colorClass: 'bg-sentilux-indigo-100', sub: 'High Reliability' },
  { label: 'Data Quality', value: '88%', icon: ShieldCheck, colorClass: 'bg-sentilux-emerald-100', sub: 'Verified Signals' },
  { label: 'Vault Volume', icon: Activity, colorClass: 'bg-sentilux-purple-100', sub: 'Total History' }
];

export const KpiCards = ({ radialValue, historyLength }: KpiCardsProps) => {
  const kpis = [
    { ...kpiConfig[0], value: `${radialValue}%` },
    { ...kpiConfig[1] },
    { ...kpiConfig[2] },
    { ...kpiConfig[3], value: historyLength }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <div 
          key={i} 
          className="glass-panel p-8 rounded-[2.5rem] border border-white shadow-sm hover:translate-y-[-4px] transition-transform"
        >
          <div className={`w-12 h-12 ${kpi.colorClass} rounded-2xl flex items-center justify-center mb-6`}>
            <kpi.icon size={24} className="text-foreground" />
          </div>
          <p className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-widest mb-2">
            {kpi.label}
          </p>
          <h4 className="text-4xl font-black text-foreground leading-none">{kpi.value}</h4>
          <p className="text-xs font-bold text-muted-foreground mt-3">{kpi.sub}</p>
        </div>
      ))}
    </div>
  );
};
