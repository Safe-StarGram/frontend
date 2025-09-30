import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Area } from "../types";
import { useEditPost } from "../../../features/Posts/useEditPost";
import { scores } from "../../../shared/config/constants";

interface IForm {
  title: string;
  areaId: number;
  subAreaId: number;
  content: string;
  reporterRisk: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  detailData: IForm;
  areas: Area[];
}

export default function EditModal({
  isOpen,
  onClose,
  postId,
  detailData,
  areas,
}: EditModalProps) {
  const { register, handleSubmit, reset, watch } = useForm<IForm>({
    defaultValues: {
      title: detailData?.title ?? "",
      areaId: detailData?.areaId ?? 0,
      subAreaId: detailData?.subAreaId ?? 0,
      content: detailData?.content ?? "",
      reporterRisk: detailData?.reporterRisk ?? "",
    },
  });

  // 지역 선택 값 watch
  const watchedAreaId = watch("areaId");

  // 선택된 지역 객체 찾기
  const selectedArea = areas?.find((area) => area.id === Number(watchedAreaId));
  const subAreas = selectedArea?.subAreas || [];

  // 수정 mutation
  const editMutation = useEditPost(postId, onClose);

  const onSubmit = (data: IForm) => {
    editMutation.mutate(data);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 모달 닫힐 때 폼 리셋
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-y-auto">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">게시물 수정</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 flex-1"
          >
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                {...register("title", { required: "제목을 입력해주세요" })}
                className="w-full border border-gray-300 rounded-md p-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="제목을 입력하세요"
              />
            </div>

            {/* 위치 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위치
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <select
                    {...register("areaId", { required: "지역을 선택해주세요" })}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">지역을 선택하세요</option>
                    {areas?.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.areaName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    {...register("subAreaId")}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!watchedAreaId || subAreas.length === 0}
                  >
                    <option value="">세부 위치를 선택하세요</option>
                    {subAreas.map((subArea) => (
                      <option key={subArea.subAreaId} value={subArea.subAreaId}>
                        {subArea.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 내용 */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                {...register("content", { required: "내용을 입력해주세요" })}
                className="w-full border border-gray-300 rounded-md p-3 h-full resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="내용을 입력하세요"
              />
            </div>

            {/* 위험성 평가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                위험성 평가
              </label>
              <select
                {...register("reporterRisk")}
                className="w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {scores.map((score) => (
                  <option key={score.value} value={score.value}>
                    {score.value}점 {score.text}
                  </option>
                ))}
              </select>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={editMutation.isPending}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-md transition-colors disabled:opacity-50 text-lg font-medium"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={editMutation.isPending}
                className="flex-1 bg-brand hover:bg-orange-300 text-white p-3 rounded-md transition-colors disabled:opacity-50 text-lg font-medium"
              >
                {editMutation.isPending ? "수정 중..." : "수정 완료"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
