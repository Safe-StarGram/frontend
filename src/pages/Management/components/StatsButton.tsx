import Button from "../../../shared/layout/Button";
import { MdBarChart } from "react-icons/md";
import { useNavigate } from "react-router";

export default function StatsButton() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <Button
        disabled={false}
        className="w-full bg-brand hover:bg-orange-300 transition rounded-lg text-white font-medium py-3"
        onClick={() => navigate("/stat")}
      >
        <MdBarChart className="w-5 h-5" />
        종합 통계 보기
      </Button>
    </div>
  );
}
