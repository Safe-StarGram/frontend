import { IoHome, IoCamera, IoNotifications, IoPerson } from "react-icons/io5";
import { Link } from "react-router";

interface FooterProps {
  activeTab: "home" | "upload" | "notifications" | "profile" | "management";
  notificationCount?: number;
}

export default function Footer({
  activeTab,
}: FooterProps) {
  const tabs = [
    { id: "home", label: "홈", icon: IoHome },
    { id: "upload", label: "사진 올리기", icon: IoCamera },
    { id: "notifications", label: "알림", icon: IoNotifications },
    { id: "profile", label: "프로필", icon: IoPerson },
  ] as const;

  return (
    <footer className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 h-20">
      <nav className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Link
              to={tab.id === "home" ? "/" : `/${tab.id}`}
              key={tab.id}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${isActive
                ? "text-orange-500"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 ${isActive ? "text-orange-500" : "text-gray-500"
                    }`}
                />
              </div>
              <span
                className={`text-xs mt-1 ${isActive ? "text-orange-500" : "text-gray-500"
                  }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
