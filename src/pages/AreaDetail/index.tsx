import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import AreaImageUpload from "./components/AreaImageUpload";
import AreaEditForm from "./components/AreaEditForm";
import AreaStatistics from "./components/AreaStatistics";
import { AreaDetailProvider, useAreaDetailContext } from "./context/AreaDetailContext";

// Layout을 감싸는 내부 컴포넌트
function AreaDetailContent() {
  const { areaName } = useAreaDetailContext();
  const [notificationCount] = useState(9);

  return (
    <Layout
      title={`${areaName} 상세보기`}
      showBackButton={true}
      activeTab="profile"
      notificationCount={notificationCount}
    >
      <div className="space-y-8">
        <AreaImageUpload />
        <AreaEditForm />
        <AreaStatistics />
      </div>
    </Layout>
  );
}

export default function AreaDetail() {
  return (
    <AreaDetailProvider>
      <AreaDetailContent />
    </AreaDetailProvider>
  );
}
