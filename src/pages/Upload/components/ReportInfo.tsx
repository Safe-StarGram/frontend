import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { findDepartment, findPosition } from "../../../shared/config/constants";
import type { IProfileData } from "../../Profile/types";

interface ReportInfoProps {
  profileData: IProfileData | null;
  currentTime: string;
}

const getUserInfo = (data: IProfileData | null) => {
  if (!data) return null;
  const { name, department, position } = data;
  return (
    <div>
      {name} ({findDepartment(department)} {findPosition(position)})
    </div>
  );
};

export const ReportInfo = ({ profileData, currentTime }: ReportInfoProps) => {
  return (
    <>
      <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
        <FaRegUserCircle className="text-gray-500 w-6 h-6" />
        <div>
          <div className="text-gray-500 text-sm">보고자</div>
          {getUserInfo(profileData)}
        </div>
      </div>
      <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
        <FaRegCalendarAlt className="text-gray-500 w-6 h-6" />
        <div>
          <div className="text-gray-500 text-sm">보고 시각</div>
          <div>{currentTime}</div>
        </div>
      </div>
    </>
  );
};
