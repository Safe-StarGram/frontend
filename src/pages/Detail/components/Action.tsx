import { useForm } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { IActionForm, IDetailInfo } from "../types";
import { findDepartment, findPosition } from "../../../shared/config/constants";
import { changeTimeForm } from "../../../shared/hooks/useCurrentTime";
import { useAction } from "../../../shared/hooks/useAction";
import { useProfile } from "../../../shared/hooks/useProfile";

interface IProps {
  postId: string;
  detailInfo: IDetailInfo;
}

export default function Action({ postId, detailInfo }: IProps) {
  const [currentDetail, setCurrentDetail] = useState<IDetailInfo>(detailInfo);
  const { profileData } = useProfile();
  const userRole = useSelector((state: RootState) => state.user.role);
  const isAdmin = userRole === "ROLE_ADMIN";

  const { register, watch, setValue, getValues } = useForm<IActionForm>({
    defaultValues: {
      isChecked: detailInfo.isChecked,
      isActionTaken: detailInfo.isActionTaken,
    },
  });

  const isChecked = watch("isChecked") === 1;
  const isActionTaken = watch("isActionTaken") === 1;

  useEffect(() => {
    setCurrentDetail(detailInfo);
    setValue("isChecked", detailInfo.isChecked);
    setValue("isActionTaken", detailInfo.isActionTaken);
  }, [detailInfo, setValue]);

  const actionMutation = useAction(postId);

  const handleToggle = (field: keyof IActionForm, currentValue: number) => {
    const newValue = currentValue === 1 ? 0 : 1;
    setValue(field, newValue, { shouldDirty: true });
    actionMutation.mutate(getValues(), {
      onSuccess: (data) => {
        setCurrentDetail(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">조치 유무</h3>
      <div className="flex flex-col gap-3 border rounded-md p-3">
        <div className="flex items-center gap-5">
          <span>확인</span>
          <input type="hidden" {...register("isChecked")} />
          <IoMdCheckboxOutline
            className={`w-8 h-8 ${
              isAdmin 
                ? "hover:cursor-pointer" 
                : "cursor-not-allowed opacity-50"
            } ${
              isChecked ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => {
              if (isAdmin) {
                handleToggle("isChecked", watch("isChecked") as number);
              }
            }}
          />
          {isChecked && (
            <div>
              <div>
                {profileData?.name || "사용자"} (
                {findDepartment(profileData?.department || "0")}{" "}
                {findPosition(profileData?.position || "0")})
              </div>
              <div className="text-sm text-gray-500">
                {changeTimeForm(currentDetail.isCheckedAt)}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          <span>조치</span>
          <input type="hidden" {...register("isActionTaken")} />
          <IoMdCheckboxOutline
            className={`w-8 h-8 ${
              isAdmin 
                ? "hover:cursor-pointer" 
                : "cursor-not-allowed opacity-50"
            } ${
              isActionTaken ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => {
              if (isAdmin) {
                handleToggle("isActionTaken", watch("isActionTaken") as number);
              }
            }}
          />
          {isActionTaken && (
            <div>
              <div>
                {profileData?.name || "사용자"} (
                {findDepartment(profileData?.department || "0")}{" "}
                {findPosition(profileData?.position || "0")})
              </div>
              <div className="text-sm text-gray-500">
                {changeTimeForm(currentDetail.isActionTakenAt)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
