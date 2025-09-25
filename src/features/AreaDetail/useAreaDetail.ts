import { useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { clearAccessToken } from "../../store/authSlice";
import { clearUserId } from "../../store/userSlice";
import type { ManagementArea } from "../../pages/Management/types";

export const useAreaDetail = (areaId: number | null) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  // JWT 서명 오류 해결을 위해 토큰 완전 초기화
  const clearTokenAndRedirect = () => {
    dispatch(clearAccessToken());
    dispatch(clearUserId());
    localStorage.removeItem("persist:root");
    window.location.href = "/login";
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["area-detail", areaId, !!accessToken],
    queryFn: async (): Promise<ManagementArea> => {
      try {
        const res = await api.get(`sites/${areaId}`);
        return res.data;
      } catch (err: any) {
        // JWT 서명 오류 또는 401 에러 시 토큰 초기화
        if (err.response?.status === 401) {
          clearTokenAndRedirect();
        }
        throw err;
      }
    },
    enabled: !!accessToken && !!areaId, // 토큰과 areaId가 있을 때만 API 호출
    retry: false, // JWT 오류 시 재시도 방지
  });

  return { area: data, isLoading, error };
};
