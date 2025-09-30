import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { block: '1블록', level3: 12, level4: 18, level5: 15 },
  { block: '2블록', level3: 8, level4: 22, level5: 20 },
  { block: '3블록', level3: 10, level4: 16, level5: 18 }
];

const colors = {
  level3: '#3B82F6',
  level4: '#22C55E',
  level5: '#F59E0B'
};

export default function HighRiskBarChart() {
  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center space-x-6 mb-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">
              {entry.dataKey === 'level3' ? '3점' : 
               entry.dataKey === 'level4' ? '4점' : '5점'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">고위험성(3점 이상) 조치 건수</h3>
      <Legend content={<CustomLegend />} />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="block" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Bar dataKey="level3" fill={colors.level3} radius={[4, 4, 0, 0]} />
            <Bar dataKey="level4" fill={colors.level4} radius={[4, 4, 0, 0]} />
            <Bar dataKey="level5" fill={colors.level5} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
