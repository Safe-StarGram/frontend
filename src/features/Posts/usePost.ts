import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import api from "../../shared/api/axiosInstance";
import type { IUploadData } from "../../pages/Upload/types";
import type { INotification } from "../../pages/Notifications/types";

const uploadPost = async (data: IUploadData) => {
  const formData = new FormData();

  if (data.image) {
    formData.append("image", data.image);
  }
  
  formData.append("areaId", data.areaId);
  formData.append("subAreaId", data.subAreaId);
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("reporterRisk", data.reporterRisk);

  try {
    const response = await api.post("notices", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("업로드 실패:", error);
    throw error;
  }
};

export const usePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<INotification[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get("/notices", {
        params: { page: 0, size: 10 } // 최근 10개 게시글 가져오기
      });
      
      // API 응답 구조에 따라 데이터 추출
      let posts = [];
      if (response.data.content) {
        posts = response.data.content;
      } else if (Array.isArray(response.data)) {
        posts = response.data;
      }
      
      return posts;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/notifications");
    },
    onError: (error) => {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return { posts, isLoading, uploadMutation };
};
