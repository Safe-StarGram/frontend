import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../shared/api/axiosInstance";

interface UpdatePermissionData {
  userId: number;
  grantPermission: boolean;
}

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, grantPermission }: UpdatePermissionData) => {
      const response = await api.put(`/api/admin/permission`, {
        userId,
        grantPermission,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      const action = variables.grantPermission ? "권한부여" : "권한제거";
      toast.success(`${action}가 완료되었습니다!`, {
        position: "top-center",
        autoClose: 3000,
      });
      
      // 관리자 목록 쿼리 무효화하여 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ["manager-users"] });
    },
    onError: (error: any) => {
      console.error("Permission update error:", error);
      toast.error(`권한 변경 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    },
  });

  return {
    updatePermission: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
