import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface MonthlyBarChartProps {
  title: string;
  color: string;
  data: Array<{ month: string; value: number }>;
}

const defaultData = [
  { month: '1월', value: 8 },
  { month: '2월', value: 5 },
  { month: '3월', value: 12 },
  { month: '4월', value: 7 },
  { month: '5월', value: 18 }
];

export default function MonthlyBarChart({ title, color, data = defaultData }: MonthlyBarChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: color }}
        />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Bar 
              dataKey="value" 
              fill={color} 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
