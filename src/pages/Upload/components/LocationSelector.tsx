import type { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { IoLocationOutline } from "react-icons/io5";
import type { IArea, IForm } from "../types";

interface IProps {
  register: UseFormRegister<IForm>;
  watch: UseFormWatch<IForm>;
  areas: IArea[] | undefined;
  errors: FieldErrors<IForm>;
}

export const LocationSelector = ({ register, watch, areas, errors }: IProps) => {
  const selectedUpperArea = watch("upperArea");

  return (
    <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
      <IoLocationOutline className="text-gray-500 w-6 h-6" />
      <div className="flex flex-col w-1/3">
        <label htmlFor="upperArea" className="text-gray-500 text-sm">
          상위구역
        </label>
        <select
          className={`border rounded-xl p-2 ${
            errors.upperArea ? "border-red-500" : "border-gray-500"
          }`}
          id="upperArea"
          {...register("upperArea", { required: "상위구역을 선택해주세요." })}
        >
          <option value="">선택하세요</option>
          {areas?.map((area) => (
            <option key={area.id} value={area.id}>
              {area.areaName}
            </option>
          ))}
        </select>
        {errors.upperArea && (
          <p className="text-red-500 text-sm mt-1">{errors.upperArea.message}</p>
        )}
      </div>
      <div className="flex flex-col w-2/3">
        <label htmlFor="lowerArea" className="text-gray-500 text-sm">
          하위구역
        </label>
        <select
          className={`border rounded-xl p-2 ${
            errors.lowerArea ? "border-red-500" : "border-gray-500"
          }`}
          id="lowerArea"
          {...register("lowerArea", { required: "하위구역을 선택해주세요." })}
        >
          <option value="">선택하세요</option>
          {areas
            ?.find((area) => String(area.id) === selectedUpperArea)
            ?.subAreas.map((subArea) => (
              <option key={subArea.subAreaId} value={subArea.subAreaId}>
                {subArea.name}
              </option>
            ))}
        </select>
        {errors.lowerArea && (
          <p className="text-red-500 text-sm mt-1">{errors.lowerArea.message}</p>
        )}
      </div>
    </div>
  );
};
