import Input from "../../../shared/layout/Input";
import { LuMapPin } from "react-icons/lu";
import { useAddAreaContext } from "../context/AddAreaContext";

export default function AreaForm() {
  const { areaName, setAreaName } = useAddAreaContext();
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">관리구역</h3>
      <div className="flex items-center space-x-3">
        <LuMapPin className="w-6 h-6 text-gray-400" />
        <div className="flex-1">
          <Input
            type="text"
            placeholder="새로운 관리구역 이름을 정해주세요"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
