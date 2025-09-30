import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import AddAreaSection from "./components/AddAreaSection";
import AreaList from "./components/AreaList";
import StatsButton from "./components/StatsButton";
import ManagerList from "./components/ManagerList";
import { useManagerUsers } from "../../features/Management/useManagerUsers";
import { useAreas } from "../../features/Management/useAreas";

export default function Management() {
  const [notificationCount] = useState(9);   // 임시 알림 9 데이터
  const { users, isLoading: usersLoading, error: usersError } = useManagerUsers();
  const { areas, isLoading: areasLoading, error: areasError } = useAreas();

  return (
    <Layout
      title="현장관리"
      showBackButton={true}
      activeTab="profile"
      notificationCount={notificationCount}
    >
      <div className="space-y-6">
        <AddAreaSection />
        <AreaList areas={areas} isLoading={areasLoading} error={areasError} />
        <StatsButton />
        <ManagerList users={users} isLoading={usersLoading} error={usersError} />
      </div>
    </Layout>
  );
}
