import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router";

export default function AddAreaSection() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/addarea")}
      className="w-full bg-white rounded-lg p-8 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
          <LuPlus className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">관리구역 추가하기</h2>
      </div>
    </button>
  );
}
