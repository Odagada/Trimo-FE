import fetcher from "@/apis/axios";
import { User } from "@/types/client.types";
import useManageUserAccessToken from "./useManageUserAccessToken";
import { useRef } from "react";

function useGetUserInfo() {
  const { userAccessToken } = useManageUserAccessToken();
  const userDataRef = useRef<User | null>(null);

  const requestUserData = async () => {
    if (!userAccessToken) return null;

    const { data: userData } = await fetcher<User>({
      method: "get",
      url: "/user/info",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    userDataRef.current = userData;
  };

  return { userDataRef, requestUserData };
}

export default useGetUserInfo;
