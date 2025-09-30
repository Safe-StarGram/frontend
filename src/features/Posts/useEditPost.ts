import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import type { IForm } from "../../pages/Detail/types";

export const useEditPost = (postId: string, onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IForm) =>
      (await api.patch(`notices/${postId}`, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["detail", { postId }] });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    },
  });
};
