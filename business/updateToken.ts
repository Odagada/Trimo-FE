import { request } from "@/apis/axios";
import { AxiosInstance } from "axios";

// 리프레시 토큰을 사용하여 액세스 토큰을 재발급
const reissueAccessToken = async (instance: AxiosInstance) => {
  try {
    // 실제 리프레시 토큰 엔드포인트가 생기면 바꿔야 됨
    const reissueAccessTokenResponse = await request<any>({
      url: "/api/refresh-token",
      method: "post",
      data: { refreshToken: localStorage.getItem("refreshToken") },
    });

    const { accessToken } = reissueAccessTokenResponse.data;
    localStorage.setItem("accessToken", accessToken);

    // 향후 요청에 대한 Authorization 헤더를 업데이트
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    console.error("액세스 토큰 재발급 실패:", error);
    // 리프레시 토큰 실패 처리, 예: 로그인으로 리디렉션
  }
};

export default reissueAccessToken;
