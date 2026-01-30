import { TrendingUp, Info, Scale, Hash } from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Area, 
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface AnalyticsChartsProps {
  timeSeriesData: Array<{
    name: string;
    confidence: number;
    pos: number;
    neg: number;
    neu: number;
  }>;
  radarData: Array<{
    subject: string;
    Standard: number;
    Expert: number;
    fullMark: number;
  }>;
  keywordBubbleData: Array<{
    name: string;
    x: number;
    y: number;
    z: number;
  }>;
  radialData: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
}

export const AnalyticsCharts = ({ 
  timeSeriesData, 
  radarData, 
  keywordBubbleData, 
  radialData 
}: AnalyticsChartsProps) => {
  return (
    <>
      {/* Time Series & Radar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-10 rounded-[3.5rem] border border-white shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-foreground flex items-center gap-3">
              <TrendingUp size={24} className="text-sentilux-indigo-200" /> Sentiment Over Time
            </h3>
            <button className="text-muted-foreground/50 hover:text-sentilux-indigo-400">
              <Info size={18} />
            </button>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }} />
                <Area type="monotone" dataKey="confidence" fill="#c7d2fe" stroke="#818cf8" fillOpacity={0.3} strokeWidth={3} />
                <Bar dataKey="pos" fill="#a7f3d0" barSize={10} radius={[5, 5, 0, 0]} />
                <Bar dataKey="neg" fill="#fecaca" barSize={10} radius={[5, 5, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3.5rem] border border-white shadow-sm">
          <h3 className="text-xl font-black text-foreground mb-10 flex items-center gap-3">
            <Scale size={24} className="text-sentilux-pink-300" /> Multi-Model Radar
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} />
                <Radar name="Standard" dataKey="Standard" stroke="#c7d2fe" fill="#c7d2fe" fillOpacity={0.6} />
                <Radar name="Expert" dataKey="Expert" stroke="#fbcfe8" fill="#fbcfe8" fillOpacity={0.6} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Keywords & Radial Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-10 rounded-[3.5rem] border border-white shadow-sm">
          <h3 className="text-xl font-black text-foreground mb-10 flex items-center gap-3">
            <Hash size={24} className="text-sentilux-indigo-200" /> High-Impact Keywords
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="x" name="Frequency" hide />
                <YAxis type="number" dataKey="y" name="Certainty" hide />
                <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Keywords" data={keywordBubbleData} fill="#c7d2fe">
                  {keywordBubbleData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#c7d2fe' : '#fbcfe8'} fillOpacity={0.8} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] font-black text-center text-muted-foreground/50 uppercase tracking-widest mt-4">
            Node Size = Signal Strength | Position = Frequency vs Confidence
          </p>
        </div>

        <div className="glass-panel p-10 rounded-[3.5rem] border border-white shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-black text-foreground mb-10 self-start">Engagement Vitality</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="40%" 
                outerRadius="100%" 
                barSize={25} 
                data={radialData} 
                startAngle={180} 
                endAngle={0}
              >
                <RadialBar background dataKey="value" cornerRadius={15} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-[-100px] text-center">
            <span className="text-5xl font-black text-foreground">{radialData[0]?.value || 0}%</span>
            <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest mt-2">
              Overall Satisfaction Score
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
