import { IoMdCheckboxOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { IDetailInfo } from "../types";
import { changeTimeForm } from "../../../shared/hooks/useCurrentTime";
import { useCheckAction } from "../../../features/Posts/useCheckAction";
import { useProfile } from "../../../shared/hooks/useProfile";
import { useUserById } from "../../../features/Management/useUserById";
import { findDepartment, findPosition } from "../../../shared/config/constants";

interface IProps {
  postId: string;
  detailInfo: IDetailInfo;
}

export default function Action({ postId, detailInfo }: IProps) {
  const { profileData } = useProfile();
  const userRole = useSelector((state: RootState) => state.user.role);
  const isAdmin = userRole === "ROLE_ADMIN";
  const { checkAction, isProcessing } = useCheckAction();

  // checker와 actionTaker 정보 조회
  const checkerIdNum = detailInfo.checkerId ? Number(detailInfo.checkerId) : null;
  const actionTakerIdNum = detailInfo.actionTakerId ? Number(detailInfo.actionTakerId) : null;
  
  const { data: checkerData, isLoading: isCheckerLoading } = useUserById(checkerIdNum);
  const { data: actionTakerData, isLoading: isActionTakerLoading } = useUserById(actionTakerIdNum);

  const isChecked = String(detailInfo.isChecked) === "1" || Number(detailInfo.isChecked) === 1;
  const isActionTaken = String(detailInfo.isActionTaked) === "1" || Number(detailInfo.isActionTaked) === 1;



  const handleCheck = () => {
    if (!profileData?.userId) return;
    checkAction({
      postId: parseInt(postId),
      actionType: 'check',
      userId: profileData.userId,
      currentData: detailInfo,
    });
  };

  const handleAction = () => {
    if (!profileData?.userId) return;
    checkAction({
      postId: parseInt(postId),
      actionType: 'action',
      userId: profileData.userId,
      currentData: detailInfo,
    });
  };

  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">조치 유무</h3>
      <div className="flex flex-col gap-3 border rounded-md p-3">
        <div className="flex items-center gap-5">
          <span>확인</span>
          <IoMdCheckboxOutline
            className={`w-8 h-8 ${
              isAdmin 
                ? "hover:cursor-pointer" 
                : "cursor-not-allowed opacity-50"
            } ${
              isChecked ? "text-green-500" : "text-gray-400"
            }`}
            onClick={() => {
              if (isAdmin && !isProcessing) {
                handleCheck();
              }
            }}
          />
          {isChecked && (
            <div>
              <div>
                {isCheckerLoading ? (
                  "로딩 중..."
                ) : checkerData ? (
                  `${checkerData.name} (${findDepartment(checkerData.department) || checkerData.department} ${findPosition(checkerData.position) || checkerData.position})`
                ) : (
                  `확인자 ID: ${detailInfo.checkerId}`
                )}
              </div>
              <div className="text-sm text-gray-500">
                {detailInfo.checkedAt ? changeTimeForm(detailInfo.checkedAt) : "시간 정보 없음"}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          <span>조치</span>
          <IoMdCheckboxOutline
            className={`w-8 h-8 ${
              isAdmin 
                ? "hover:cursor-pointer" 
                : "cursor-not-allowed opacity-50"
            } ${
              isActionTaken ? "text-green-500" : "text-gray-400"
            }`}
            onClick={() => {
              if (isAdmin && !isProcessing) {
                handleAction();
              }
            }}
          />
          {isActionTaken && (
            <div>
              <div>
                {isActionTakerLoading ? (
                  "로딩 중..."
                ) : actionTakerData ? (
                  `${actionTakerData.name} (${findDepartment(actionTakerData.department) || actionTakerData.department} ${findPosition(actionTakerData.position) || actionTakerData.position})`
                ) : (
                  `조치자 ID: ${detailInfo.actionTakerId}`
                )}
              </div>
              <div className="text-sm text-gray-500">
                {detailInfo.actionTakenAt ? changeTimeForm(detailInfo.actionTakenAt) : "시간 정보 없음"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
