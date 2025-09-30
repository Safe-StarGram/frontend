import { FaAngleRight, FaRegBuilding } from "react-icons/fa";
import { useNavigate } from "react-router";

interface IProps {
  area: string;
  id: number;
  a?: number;
  b?: number;
}

const changeColor = (num: number) => {
  if (num >= 7) {
    return "text-red-500";
  } else if (num >= 3) {
    return "text-yellow-500";
  } else {
    return "text-green-500";
  }
};

export default function Summary({ area, id, a = 0, b = 0 }: IProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/section/${id}`);
  };

  return (
    <div className="flex flex-col gap-3 border-2 border-gray-300 rounded-md p-3">
      <div className="flex justify-between items-center gap-3">
        <FaRegBuilding className="text-blue-500" />
        <span className="flex-1">{area}</span>
        <FaAngleRight
          className="hover:cursor-pointer hover:text-gray-500"
          onClick={handleClick}
        />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-2xl font-bold ${changeColor(a)}`}>{a}</span>
          <span className="text-gray-500">미조치 안전사항</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold">{b}</span>
          <span className="text-gray-500">최근 위험요소 신고</span>
        </div>
      </div>
      <div>
        <button
          className="bg-gray-200 p-2 w-full rounded-md hover:cursor-pointer hover:bg-gray-300 transition"
          onClick={handleClick}
        >
          {area} 보기
        </button>
      </div>
    </div>
  );
}
