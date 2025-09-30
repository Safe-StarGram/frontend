import { useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";

interface UserInfo {
  userId: number;
  name: string;
  department: string;
  position: string;
}

export const useUserById = (userId: number | null) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async (): Promise<UserInfo> => {
      if (!userId || userId === 0) throw new Error("No user ID provided");
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    },
    enabled: !!userId && userId !== 0, // userId가 있고 0이 아닐 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
