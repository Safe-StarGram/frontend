import axios from "axios";
import { store } from "../../store/store";
import { clearAccessToken, setAccessToken } from "../../store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청이 전달되기 전에 작업 수행 => 토큰이 있으면 헤더에 토큰 넣기
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 요청을 받으면 작업 수행
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // refresh 요청이면 그냥 바로 실패 처리 (무한루프 방지)
    if (originalRequest.url.includes("auth/auto-refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        // refresh 요청은 별도 axios 인스턴스 사용
        const res = await axios.post(
          "https://chan23.duckdns.org/safe_api/auth/auto-refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));

        // 실패한 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (e) {
        store.dispatch(clearAccessToken());
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
