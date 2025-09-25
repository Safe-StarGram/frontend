import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { IAreaData } from "../../pages/Detail/types";

export const useAreaById = (data: IAreaData) => {
  // areaId 기반으로 구역 정보 불러오기
  const { data: area } = useQuery({
    queryKey: ["area", data.areaId],
    queryFn: async () => (await api.get(`sites/${data.areaId}`)).data,
  });
  return { area };
};
