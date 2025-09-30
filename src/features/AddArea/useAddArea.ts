import { useMutation } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import { useNavigate } from "react-router";

interface SubArea {
  id: number;
  name: string;
}

interface AddAreaData {
  areaName: string;
  subAreas: SubArea[];
  image?: File | null;
}

export function useAddArea() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: AddAreaData) => {
      const formData = new FormData();

      // areaName 추가
      formData.append("areaName", data.areaName);

      // subAreaNames 추가 (중복 키로 여러 개 추가)
      data.subAreas.forEach((subArea) => {
        formData.append("subAreaNames", subArea.name);
      });

      // image 추가 (있는 경우에만)
      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await api.post("sites", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      alert("관리구역이 성공적으로 등록되었습니다!");
      navigate("/management");
    },
    onError: (error: any) => {
      console.error("관리구역 등록 오류:", error);
      if (error.response?.status === 401) {
        alert("인증이 필요합니다. 다시 로그인해주세요.");
      } else if (error.response?.status === 400) {
        alert("입력 정보를 확인해주세요.");
      } else {
        alert("관리구역 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
}
