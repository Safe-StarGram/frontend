import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const res = await api.post("auth/join", data);
      return res.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        alert("이메일이 중복되었습니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
}
