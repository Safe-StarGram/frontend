import type { ManagementArea } from "../types";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../shared/layout/LoadingSpinner";

interface AreaListProps {
  areas: ManagementArea[];
  isLoading: boolean;
  error?: any;
}

export default function AreaList({ areas, isLoading, error }: AreaListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">관리 구역 일람</h3>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">관리 구역 일람</h3>
        <div className="bg-white rounded-lg p-8 text-center text-red-500">
          오류가 발생했습니다: {error.message || "데이터를 불러올 수 없습니다."}
        </div>
      </div>
    );
  }

  if (!areas || areas.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">관리 구역 일람</h3>
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          등록된 관리 구역이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">관리 구역 일람</h3>
      <div className="grid grid-cols-2 gap-4">
        {areas.map((area) => (
          <div
            key={area.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden p-6"
          >
            <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">
              {area.areaName}
            </h4>
            <div className="mb-6">
              <img
                src={
                  area.imageUrl ||
                  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop"
                }
                alt={area.areaName}
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => {
                  // 이미지 로드 실패 시 기본 이미지로 대체
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop";
                }}
              />
            </div>
            {/* 서브 구역 정보 표시 */}
            {area.subAreas && area.subAreas.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  서브 구역: {area.subAreas.length}개
                </p>
                <div className="flex flex-wrap gap-1">
                  {area.subAreas.slice(0, 3).map((subArea) => (
                    <span
                      key={subArea.subAreaId}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {subArea.name}
                    </span>
                  ))}
                  {area.subAreas.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{area.subAreas.length - 3}개 더
                    </span>
                  )}
                </div>
              </div>
            )}
            <button
              onClick={() =>
                navigate("/areadetail", { state: { areaId: area.id } })
              }
              className="w-full bg-gray-100 hover:bg-gray-200 transition rounded-2xl py-4 px-6 flex items-center justify-center text-gray-700 font-medium cursor-pointer"
            >
              자세히 보기
              <span className="ml-2 text-xl">›</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
