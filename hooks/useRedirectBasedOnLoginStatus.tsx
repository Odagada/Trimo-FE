import { useRouter } from "next/router";
import { useEffect } from "react";
import useManageUserAccessToken from "./useManageUserAccessToken";
import { GetUserInfoType } from "@/types/client.types";
import fetcher from "@/apis/axios";

export async function getUserInfo(userAccessToken: string) {
  const { data } = await fetcher<GetUserInfoType>({
    method: "get",
    url: `/users/info`,
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      withCredentials: true,
    },
  });
  return data;
}

const useRedirectBasedOnLoginStatus = () => {
  const router = useRouter();
  const { userAccessToken } = useManageUserAccessToken();
  const checkLoggedIn = async () => {
    if (!userAccessToken) return false;
    try {
      await getUserInfo(userAccessToken);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      switch (router.pathname) {
        case "/":
        case "/search":
          break;
        case "/login":
        case "/signup/*":
          if (await checkLoggedIn()) {
            alert("이미 로그인한 상태입니다.");
            router.push("/search");
          }
          break;
        default:
          if (!(await checkLoggedIn())) {
            alert("로그인 후 이용해주세요.");
            router.push("/login");
          }
      }
    };
    fetchData();
  }, [router]);

  return;
};

export default useRedirectBasedOnLoginStatus;
