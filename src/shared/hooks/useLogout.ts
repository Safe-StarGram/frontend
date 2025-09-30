import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../../store/authSlice";
import { clearUserInfo } from "../../store/userSlice";
import { useNavigate } from "react-router";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      // 스토어에서 사용자 정보 제거
      dispatch(clearAccessToken());
      dispatch(clearUserInfo());
      // 로컬스토리지 정리
      localStorage.removeItem("persist:root");
      // 로그인 페이지로 이동
      navigate("/login");
    },
    onError: (error: any) => {
      // 에러가 발생해도 클라이언트 측 정보는 정리
      dispatch(clearAccessToken());
      dispatch(clearUserInfo());
      localStorage.removeItem("persist:root");
      navigate("/login");
      console.error("로그아웃 중 오류 발생:", error);
    },
  });
}
