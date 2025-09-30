import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  activeTab: "home" | "upload" | "notifications" | "profile" | "management";
  notificationCount?: number;
}

export default function Layout({
  children,
  title,
  showBackButton = true,
  activeTab,
  notificationCount = 0,
}: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-gray-50">
      <Header title={title} showBackButton={showBackButton} />

      <main className="py-4 px-6 md:px-8 lg:px-12 flex-1 overflow-auto h-[calc(100vh-10rem)]">
        {children}
      </main>

      <Footer activeTab={activeTab} notificationCount={notificationCount} />
    </div>
  );
}
