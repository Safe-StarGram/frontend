import Input from "../../../shared/layout/Input";
import Button from "../../../shared/layout/Button";
import { LuMapPin, LuTrash2, LuCirclePlus, LuPencil } from "react-icons/lu";
import { useAreaDetailContext } from "../context/AreaDetailContext";

export default function AreaEditForm() {
  const { 
    areaName,
    subAreas, 
    newSubAreaName, 
    handleSubAreaChange, 
    removeSubArea, 
    setNewSubAreaName, 
    addSubArea,
    handleSave,
    isSaving
  } = useAreaDetailContext();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">관리구역 정보 수정</h2>
      
      {/* 구역명 표시 (읽기 전용) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">구역명</h3>
        <div className="flex items-center space-x-3">
          <LuMapPin className="w-6 h-6 text-gray-400" />
          <div className="flex-1">
            <p className="text-lg font-medium text-gray-800">{areaName}</p>
            <p className="text-sm text-gray-500">구역명은 수정할 수 없습니다.</p>
          </div>
        </div>
      </div>
      
      {/* 소구역 목록 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">
          소구역 ({subAreas.length}개)
        </h3>
        <div className="flex items-start space-x-3">
          <LuMapPin className="w-6 h-6 text-gray-400 mt-3" />
          <div className="flex-1 space-y-3">
            {/* 기존 소구역 목록 */}
            {subAreas.map((subArea, index) => (
              <div key={`subArea-${subArea.id}-${index}`} className="flex items-center space-x-3">
                <Input
                  type="text"
                  value={subArea.name}
                  onChange={(e) => handleSubAreaChange(subArea.id, e.target.value)}
                  className="flex-1"
                  placeholder="소구역 이름을 입력하세요"
                  disabled={isSaving}
                />
                <button
                  onClick={() => removeSubArea(subArea.id)}
                  disabled={isSaving}
                  className="w-12 h-12 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
                  title="소구역 삭제"
                >
                  <LuTrash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {/* 새 소구역 추가 */}
            <div className="flex items-center space-x-3">
              <Input
                type="text"
                placeholder="새로운 소구역을 추가하세요"
                value={newSubAreaName}
                onChange={(e) => setNewSubAreaName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isSaving) {
                    addSubArea();
                  }
                }}
                disabled={isSaving}
                className="flex-1"
              />
              <button
                onClick={addSubArea}
                disabled={!newSubAreaName.trim() || isSaving}
                className="w-12 h-12 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
                title="소구역 추가"
              >
                <LuCirclePlus className="w-5 h-5" />
              </button>
            </div>

            {/* 소구역이 없는 경우 안내 메시지 */}
            {subAreas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">등록된 소구역이 없습니다.</p>
                <p className="text-sm">위의 입력란에서 새로운 소구역을 추가해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <Button
        disabled={subAreas.length === 0 || isSaving}
        className="w-full rounded-lg py-4 text-lg font-medium mt-6 mb-4"
        baseColor="brand"
        hoverColor="orange-300"
        onClick={handleSave}
      >
        {isSaving ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            저장 중...
          </>
        ) : (
          <>
            <LuPencil className="w-5 h-5" />
            관리구역 정보 수정
          </>
        )}
      </Button>
      
      {subAreas.length === 0 && !isSaving && (
        <p className="text-sm text-red-500 text-center">
          최소 하나의 소구역이 필요합니다.
        </p>
      )}
      
      {isSaving && (
        <p className="text-sm text-blue-600 text-center">
          구역 정보를 저장하고 있습니다. 잠시만 기다려주세요...
        </p>
      )}
    </div>
  );
}
