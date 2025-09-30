import Summary from "./Summary";
import { useArea } from "../../../features/Areas/useArea";

export default function SummaryContainer() {
  const { areas, isLoading } = useArea();
  return (
    <div>
      <h3 className="text-2xl mb-3">현장구역 요약</h3>
      <div className="grid grid-cols-2 gap-4">
        {isLoading
          ? null
          : areas?.map((area, index) => (
              <Summary area={area.areaName} id={area.id} key={index} />
            ))}
      </div>
    </div>
  );
}
