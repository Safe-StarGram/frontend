import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { IArea } from "../../pages/Upload/types";

export const useArea = () => {
  const { data: areas, isLoading } = useQuery<IArea[]>({
    queryKey: ["areas"],
    queryFn: async () => (await api.get("sites")).data,
  });
  return { areas, isLoading };
};
