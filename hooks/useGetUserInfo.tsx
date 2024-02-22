import fetcher from "@/apis/axios";
import { User } from "@/types/client.types";
import { useQuery } from "@tanstack/react-query";
import useManageUserAccessToken from "./useManageUserAccessToken";

function useGetUserInfo() {
  const { userAccessToken } = useManageUserAccessToken();
  // console.log(userAccessToken);

  const requestUserData = async () => {
    if (!userAccessToken) return null;

    const { data: userData } = await fetcher<User>({
      method: "get",
      url: "/users/info",
      headers: { Authorization: `Bearer ${userAccessToken}`, "Content-Type": "application/json" },
    });
    return userData;
  };

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => requestUserData(),
  });

  return userData;
}

export default useGetUserInfo;
