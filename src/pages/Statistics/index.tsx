import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import YearSelector from "./components/YearSelector";
import ReportPieChart from "./components/ReportPieChart";
import MonthlyLineChart from "./components/MonthlyLineChart";
import HighRiskBarChart from "./components/HighRiskBarChart";

export default function Statistics() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [notificationCount] = useState(9);

  return (
    <Layout
      title="현장 위험요소 통계"
      showBackButton={true}
      activeTab="profile"
      notificationCount={notificationCount}
    >
      <div className="space-y-6">
        {/* 연도 선택 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">기간</h2>
          <YearSelector 
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </div>

        {/* 보고 건수 파이 차트 */}
        <ReportPieChart title="보고 건수" />

        {/* 조치 건수 파이 차트 */}
        <ReportPieChart title="조치 건수" />

        {/* 월별 신고 건수 추이 라인 차트 */}
        <MonthlyLineChart />

        {/* 고위험성 조치 건수 바 차트 */}
        <HighRiskBarChart />
      </div>
    </Layout>
  );
}
