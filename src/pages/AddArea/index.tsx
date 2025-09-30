import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import ImageUpload from "./components/ImageUpload";
import AreaForm from "./components/AreaForm";
import SubAreaForm from "./components/SubAreaForm";
import RegisterButton from "./components/RegisterButton";
import { AddAreaProvider } from "./context/AddAreaContext";

export default function AddArea() {
  const [notificationCount] = useState(9);

  return (
    <AddAreaProvider>
      <Layout
        title="관리구역 추가하기"
        showBackButton={true}
        activeTab="profile"
        notificationCount={notificationCount}
      >
        <div className="space-y-4">
          <ImageUpload />
          <AreaForm />
          <SubAreaForm />
          <RegisterButton />
        </div>
      </Layout>
    </AddAreaProvider>
  );
}
