import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface StatItem {
  name: string;
  value: number;
  color: string;
}

interface SentimentPieChartProps {
  stats: StatItem[];
}

export const SentimentPieChart = ({ stats }: SentimentPieChartProps) => {
  return (
    <div className="glass-panel p-8 rounded-[3rem] flex flex-col border border-white shadow-sm sticky top-28 h-fit">
      <h3 className="text-xl font-black text-foreground mb-10">Current Mix</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={stats} 
              cx="50%" 
              cy="50%" 
              innerRadius={75} 
              outerRadius={105} 
              paddingAngle={10} 
              dataKey="value" 
              stroke="none"
            >
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '1.5rem', 
                border: 'none', 
                background: 'white', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 space-y-3">
        {stats.map(s => (
          <div key={s.name} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-white">
            <div className="flex items-center gap-4">
              <div 
                className="w-4 h-4 rounded-full border border-white shadow-sm" 
                style={{ background: s.color }}
              />
              <span className="text-sm font-bold text-muted-foreground">{s.name}</span>
            </div>
            <span className="text-base font-black text-foreground">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
