import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { IActionForm, IDetailInfo } from "../../pages/Detail/types";

export const useAction = (postId: string) => {
  return useMutation<IDetailInfo, unknown, IActionForm>({
    mutationFn: async (data: IActionForm) => {
      const res = await api.patch(`notices/status/${postId}`, data);
      return res.data;
    },
  });
};
