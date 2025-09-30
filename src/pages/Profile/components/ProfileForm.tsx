import { useForm } from "react-hook-form";
import ProfileImageUpload from "./ProfileImageUpload";
import { useEffect } from "react";
import type { IProfileData } from "../types";
import { departments, positions } from "../../../shared/config/constants";
import Button from "../../../shared/layout/Button";

interface Props {
  defaultValues?: IProfileData;
  onSubmit: (data: IProfileData) => void;
}

export default function ProfileForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, setValue, reset } = useForm<IProfileData>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        phone: defaultValues.phone || "",
        radio: defaultValues.radio || 0,
        department: defaultValues.department || "0",
        position: defaultValues.position || "0",
      });
    }
  }, [defaultValues, reset]);

  const defaultImageUrl =
    typeof defaultValues?.image === "string" ? defaultValues.image : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileImageUpload
        setValue={setValue}
        defaultImage={defaultImageUrl}
        key={defaultImageUrl}
      />

      <div className="border border-gray-300 p-3 rounded-2xl">
        <div className="font-bold mt-2">인적사항</div>
        <hr className="text-gray-300 mb-5 mt-2 border-1" />

        <div className="flex flex-col gap-2">
          <label htmlFor="name">이름</label>
          <input
            className="rounded-xl p-2 border border-gray-300"
            placeholder="이름"
            {...register("name")}
          />
          <hr className="text-gray-300 mb-5 mt-2" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone">핸드폰/무전번호</label>
          <div className="flex gap-2">
            <input
              className="rounded-xl border border-gray-300 p-2 w-2/3 placeholder:text-sm"
              placeholder="010-1234-5678 ( - 빼고 입력 해주세요 )"
              {...register("phone")}
            />
            <div className="flex items-center border border-gray-300 rounded-xl w-1/3">
              <span className="px-2 text-gray-500">#</span>
              <input
                className="flex-1 p-2 outline-none"
                placeholder="0"
                {...register("radio")}
              />
            </div>
          </div>
          <hr className="text-gray-300 mb-5 mt-2" />
        </div>

        <div className="flex flex-col gap-2">
          <label>부서/직책</label>
          <div className="flex gap-2">
            <select
              {...register("department")}
              className="rounded-xl border border-gray-300 w-2/3 p-2"
            >
              {departments.map((department) => (
                <option value={department.value} key={department.value}>
                  {department.text}
                </option>
              ))}
            </select>
            <select
              {...register("position")}
              className="rounded-xl border border-gray-300 w-1/3 p-2"
            >
              {positions.map((position) => (
                <option value={position.value} key={position.value}>
                  {position.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Button disabled={false} className="rounded-2xl w-full my-3">
        프로필 저장
      </Button>
    </form>
  );
}
