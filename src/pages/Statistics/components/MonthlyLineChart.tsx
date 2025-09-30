import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: '1월', block1: 5, block2: 8, block3: 3 },
  { month: '2월', block1: 7, block2: 12, block3: 6 },
  { month: '3월', block1: 12, block2: 15, block3: 9 },
  { month: '4월', block1: 8, block2: 18, block3: 12 },
  { month: '5월', block1: 15, block2: 22, block3: 18 }
];

const colors = {
  block1: '#3B82F6',
  block2: '#22C55E', 
  block3: '#F59E0B'
};

export default function MonthlyLineChart() {
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
              {entry.dataKey === 'block1' ? '1블록' : 
               entry.dataKey === 'block2' ? '2블록' : '3블록'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">월별 신고 건수 추이</h3>
      <Legend content={<CustomLegend />} />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            <Line 
              type="monotone" 
              dataKey="block1" 
              stroke={colors.block1}
              strokeWidth={3}
              dot={{ fill: colors.block1, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="block2" 
              stroke={colors.block2}
              strokeWidth={3}
              dot={{ fill: colors.block2, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="block3" 
              stroke={colors.block3}
              strokeWidth={3}
              dot={{ fill: colors.block3, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
