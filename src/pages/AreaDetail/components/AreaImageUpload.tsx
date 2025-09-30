import { useRef } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { useAreaDetailContext } from "../context/AreaDetailContext";

export default function AreaImageUpload() {
  const { imagePreview, currentImageUrl, handleImageSelect, isSaving } = useAreaDetailContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (!isSaving) {
      fileInputRef.current?.click();
    }
  };

  // 표시할 이미지 결정: 새로 선택한 이미지 > 기존 이미지 > 기본 이미지
  const displayImage = imagePreview || currentImageUrl;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">구역 이미지</h3>
      <div 
        onClick={handleImageClick}
        className={`group w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center transition-colors relative overflow-hidden ${
          isSaving 
            ? 'cursor-not-allowed opacity-50' 
            : 'cursor-pointer hover:bg-gray-300'
        }`}
      >
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt="관리구역 이미지"
              className="w-full h-full object-cover"
              onError={(e) => {
                // 이미지 로드 실패 시 기본 이미지로 대체
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop";
              }}
            />
            {/* 이미지 위에 편집 아이콘 오버레이 */}
            {!isSaving && (
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all flex items-center justify-center">
                <div className="transition-opacity">
                  <LuCirclePlus className="w-24 h-24 text-orange-500" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center">
              <LuCirclePlus className="w-16 h-16 text-teal-500" />
            </div>
            <p className="text-gray-500 text-center">
              {isSaving ? "저장 중..." : "클릭하여 구역 이미지를 업로드하세요"}
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        disabled={isSaving}
        className="hidden"
      />
      {imagePreview && !isSaving && (
        <p className="text-sm text-teal-600 mt-2 text-center">
          새 이미지가 선택되었습니다. 저장 버튼을 눌러 적용하세요.
        </p>
      )}
      {isSaving && (
        <p className="text-sm text-blue-600 mt-2 text-center">
          이미지를 포함한 구역 정보를 저장하고 있습니다...
        </p>
      )}
    </div>
  );
}
