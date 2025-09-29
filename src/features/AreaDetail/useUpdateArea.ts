import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../../store/authSlice";
import { clearUserInfo } from "../../store/userSlice";
import type { SubArea } from "../../pages/Management/types";

interface UpdateAreaData {
  areaId: number;
  subAreas: SubArea[];
  image?: File | null;
}

export const useUpdateArea = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // JWT 서명 오류 해결을 위해 토큰 완전 초기화
  const clearTokenAndRedirect = () => {
    dispatch(clearAccessToken());
    dispatch(clearUserInfo());
    localStorage.removeItem("persist:root");
    window.location.href = "/login";
  };

  const mutation = useMutation({
    mutationFn: async (data: UpdateAreaData) => {
      try {
        const formData = new FormData();

        // 소구역 이름들을 개별적으로 추가 (subAreaNames)
        data.subAreas.forEach((subArea) => {
          formData.append("subAreaNames", subArea.name);
        });

        // 이미지가 있으면 추가
        if (data.image) {
          formData.append("image", data.image);
        }

        const res = await api.put(`sites/${data.areaId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      } catch (err: any) {
        // JWT 서명 오류 또는 401 에러 시 토큰 초기화
        if (err.response?.status === 401) {
          clearTokenAndRedirect();
        }
        throw err;
      }
    },
    onSuccess: (_, variables) => {
      // 관련 쿼리 무효화하여 데이터 새로고침
      queryClient.invalidateQueries({
        queryKey: ["area-detail", variables.areaId],
      });
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });

  return {
    updateArea: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
