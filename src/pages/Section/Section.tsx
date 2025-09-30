import { useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import Layout from "../../shared/layout/Layout";
import { useParams } from "react-router";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaSearchLocation } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { BiCheckSquare } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";

interface IAreaData {
  areaName: string;
  imageUrl: string;
  subAreas: ISubArea[];
}
interface ISubArea {
  id: number;
  name: string;
}

export default function Section() {
  const { sectionId } = useParams();
  const { data, isLoading } = useQuery<IAreaData>({
    queryKey: ["section", sectionId],
    queryFn: async () => (await api.get(`sites/${sectionId}`)).data,
  });


  return (
    <>
      {isLoading ? (
        <Layout activeTab="home" showBackButton={true} title="로딩중...">
          로딩중 ..
        </Layout>
      ) : (
        <Layout
          activeTab="home"
          showBackButton={true}
          title={`${data?.areaName} 요약`}
        >
          <img
            src={
              data?.imageUrl ||
              "https://imagescdn.gettyimagesbank.com/500/202202/jv12533599.jpg"
            }
            alt="image"
          />

          <h3 className="text-2xl font-bold mt-10 mb-5">
            {data?.areaName} 안전 상황
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-3">
              <IoLocationOutline className="text-gray-500 w-6 h-6" />
              <div>
                <div className="text-gray-500 text-sm">위치</div>
                <div>{data?.areaName}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-3">
              <FaSearchLocation className="text-gray-500 w-6 h-6" />
              <div>
                <div className="text-gray-500 text-sm">세부 구역</div>
                <div>
                  {data?.subAreas.map((subArea, idx) => (
                    <span key={subArea.id}>
                      {subArea.name}
                      {idx < (data?.subAreas.length ?? 0) - 1 && " / "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-3">
              <FaRegCalendarAlt className="text-gray-500 w-6 h-6" />
              <div>
                <div className="text-gray-500 text-sm">최근 리포트</div>
                <div>{data?.areaName}</div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-10 mb-5">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center justify-center border rounded-md p-4 shadow-sm">
              <FiAlertTriangle className="text-orange-500 w-6 h-6 mb-2" />
              <div className="text-xl font-bold">0</div>
              <div className="text-gray-500 text-sm">신고 건수</div>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-md p-4 shadow-sm">
              <BiCheckSquare className="text-green-500 w-6 h-6 mb-2" />
              <div className="text-xl font-bold">0</div>
              <div className="text-gray-500 text-sm">조치 건수</div>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-md p-4 shadow-sm">
              <IoIosTimer className="text-blue-500 w-6 h-6 mb-2" />
              <div className="text-xl font-bold">0 day</div>
              <div className="text-gray-500 text-sm">무사고 기록</div>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-md p-4 shadow-sm">
              <LuClipboardList className="text-purple-500 w-6 h-6 mb-2" />
              <div className="text-xl font-bold">0</div>
              <div className="text-gray-500 text-sm">사고 건수</div>
            </div>
          </div>

        </Layout>
      )}
    </>
  );
}
