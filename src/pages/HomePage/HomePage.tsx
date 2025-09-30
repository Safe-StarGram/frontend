import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import TBM from "./components/TBM";
import SummaryContainer from "./components/SummaryContainer";
import ImageContainer from "./components/ImageContainer";

export default function HomePage() {
  const [notificationCount] = useState(9);

  return (
    <Layout
      title="홈"
      showBackButton={false}
      activeTab="home"
      notificationCount={notificationCount}
    >
      <div className="flex flex-col gap-10">
        <TBM />
        <SummaryContainer />
        <ImageContainer />
      </div>
    </Layout>
  );
}
