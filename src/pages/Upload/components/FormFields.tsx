import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import type { IForm } from "../types";
import { scores } from "../../../shared/config/constants";

interface FormFieldsProps {
  register: UseFormRegister<IForm>;
  isLoading: boolean;
  errors: FieldErrors<IForm>;
}

export const FormFields = ({ register, isLoading, errors }: FormFieldsProps) => {
  return (
    <>
      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">제목</h3>
        <input
          className={`border rounded-md w-full p-1 px-2 ${
            errors.title ? "border-red-500" : "border-gray-500"
          }`}
          {...register("title", { required: "제목을 입력해주세요." })}
          disabled={isLoading}
          placeholder="제목을 입력하세요"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">내용</h3>
        <textarea
          className={`border rounded-md w-full p-1 px-2 h-30 ${
            errors.description ? "border-red-500" : "border-gray-500"
          }`}
          {...register("description", { required: "내용을 입력해주세요." })}
          disabled={isLoading}
          placeholder="내용을 입력하세요"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">보고자 위험성 평가(1 ~ 5점)</h3>
        <div className="flex items-center border border-gray-300 rounded-xl p-2 gap-2">
          <CiWarning className="text-brand w-6 h-6" />
          <select
            className={`border rounded-xl p-2 w-full ${
              errors.score ? "border-red-500" : "border-gray-500"
            }`}
            {...register("score", { required: "위험성 평가를 선택해주세요." })}
            disabled={isLoading}
          >
            <option value="">위험성 평가를 선택하세요</option>
            {scores.map((score) => (
              <option key={score.value} value={score.value}>
                {score.value}점 {score.text}
              </option>
            ))}
          </select>
        </div>
        {errors.score && (
          <p className="text-red-500 text-sm mt-1">{errors.score.message}</p>
        )}
      </div>
    </>
  );
};
