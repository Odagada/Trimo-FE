import updateToken from "@/business/updateToken";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "",
  withCredentials: true,
  timeout: 5 * 1000,
});

// 401 오류와 리프레시 토큰을 처리하는 요청 인터셉터
instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // 액세스 토큰이 있으면 요청 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await updateToken(instance);

        // 리프레시 토큰이 성공하면 원래 요청을 다시 시도
        return instance(originalRequest);
      } catch (error) {
        // 리프레시 토큰 실패 처리, 예: 로그인으로 리디렉션
      }
    }

    return Promise.reject(error);
  }
);

export const request = <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, any>> => {
  const client = instance;
  return client(config);
};

const fetcher = async <T>(config: AxiosRequestConfig) => {
  const response = await request<T>({ ...config });
  const { data, status }: { data: T; status: number } = response;

  return { data, status };
};

export default fetcher;
