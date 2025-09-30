import { useState } from "react";
import MonthlyBarChart from "./MonthlyBarChart";
import YearSelector from "../../Statistics/components/YearSelector";

const reportData = [
  { month: '1월', value: 8 },
  { month: '2월', value: 5 },
  { month: '3월', value: 12 },
  { month: '4월', value: 7 },
  { month: '5월', value: 18 }
];

const actionData = [
  { month: '1월', value: 6 },
  { month: '2월', value: 4 },
  { month: '3월', value: 10 },
  { month: '4월', value: 6 },
  { month: '5월', value: 15 }
];

const highRiskData = [
  { month: '1월', value: 4 },
  { month: '2월', value: 2 },
  { month: '3월', value: 8 },
  { month: '4월', value: 3 },
  { month: '5월', value: 12 }
];

export default function AreaStatistics() {
  const [selectedYear, setSelectedYear] = useState(2025);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">관리구역 세부 통계</h2>
      
      {/* 연도 선택 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">기간</h3>
        <YearSelector 
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </div>

      {/* 보고건수 차트 */}
      <MonthlyBarChart 
        title="보고건수"
        color="#3B82F6"
        data={reportData}
      />

      {/* 조치건수 차트 */}
      <MonthlyBarChart 
        title="조치건수"
        color="#22C55E"
        data={actionData}
      />

      {/* 고위험성 조치건수 차트 */}
      <MonthlyBarChart 
        title="고위험성 조치건수"
        color="#F59E0B"
        data={highRiskData}
      />
    </div>
  );
}
