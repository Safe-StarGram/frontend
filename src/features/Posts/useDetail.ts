// src/shared/hooks/useDetail.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../shared/api/axiosInstance";

export const useDetail = (postId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: detailData, isLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: async () => (await api.get(`/notices/${postId}`)).data,
  });

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`notices/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("삭제가 완료되었습니다!", {
        position: "top-center",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(-1);
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
      toast.error(`삭제 중 오류가 발생했습니다: ${error.response?.status} - ${error.response?.data?.message || error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    },
  });

  return { detailData, isLoading, deleteMutation };
};
