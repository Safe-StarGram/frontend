import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import type { IProfileData } from "../../Profile/types";
import { findDepartment, findPosition } from "../../../shared/config/constants";
import { changeTimeForm } from "../../../shared/hooks/useCurrentTime";
import { useAreaById } from "../../../features/Areas/useAreaById";
import type { IAreaData } from "../types";

interface OutlineProps {
  data: IAreaData;
  profileData?: IProfileData | null;
}

export default function Outline({ data, profileData }: OutlineProps) {
  const formattedContent = data.content.replace(/\\n/g, "\n");

  const { area } = useAreaById(data);

  // subAreaId에 해당하는 이름 찾기
  const subAreaName = area?.subAreas?.find(
    (sub: { id: number; name: string }) =>
      sub.id === data.subAreaId
  )?.name;

  return (
    <div className="flex flex-col gap-10 mt-10">
      <div>
        <h3 className="text-2xl mb-2">위험성 보고 개요</h3>
        <div className="flex flex-col gap-3 border rounded-md px-3 py-5">
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">위치</div>
              <div>
                {area ? (
                  <>
                    {area.areaName} / {subAreaName}
                  </>
                ) : (
                  `${data.areaId} / ${data.subAreaId}`
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaRegUserCircle className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">보고자</div>
              <div>
                {profileData?.name} ({findDepartment(profileData?.department)}{" "}
                {findPosition(profileData?.position)})
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaRegCalendarAlt className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">보고 시각</div>
              <div>{changeTimeForm(data.createdAt)}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl mb-2">위험성 보고 내용</h3>
        <div className="border rounded-md p-3 whitespace-pre-wrap">
          {formattedContent}
        </div>
      </div>
    </div>
  );
}
