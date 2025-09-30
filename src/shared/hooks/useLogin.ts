import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/authSlice";
import { setUserId, setUserRole } from "../../store/userSlice";
import { useNavigate } from "react-router";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await api.post("auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setUserId(data.userId));
      dispatch(setUserRole(data.role));
      navigate("/");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("서버 에러가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
}
