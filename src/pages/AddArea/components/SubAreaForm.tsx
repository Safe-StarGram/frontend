import Input from "../../../shared/layout/Input";
import { LuMapPin, LuTrash2, LuCirclePlus } from "react-icons/lu";
import { useAddAreaContext } from "../context/AddAreaContext";

export default function SubAreaForm() {
  const { 
    subAreas, 
    newSubAreaName, 
    handleSubAreaChange, 
    removeSubArea, 
    setNewSubAreaName, 
    addSubArea 
  } = useAddAreaContext();
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">소구역</h3>
      <div className="flex items-start space-x-3">
        <LuMapPin className="w-6 h-6 text-gray-400 mt-3" />
        <div className="flex-1 space-y-3">
          {/* 기존 소구역 목록 */}
          {subAreas.map((subArea) => (
            <div key={subArea.id} className="flex items-center space-x-3">
              <Input
                type="text"
                value={subArea.name}
                onChange={(e) => handleSubAreaChange(subArea.id, e.target.value)}
                className="flex-1"
              />
              <button
                onClick={() => removeSubArea(subArea.id)}
                className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-colors"
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
                if (e.key === "Enter") {
                  addSubArea();
                }
              }}
              className="flex-1"
            />
            <button
              onClick={addSubArea}
              className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <LuCirclePlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
