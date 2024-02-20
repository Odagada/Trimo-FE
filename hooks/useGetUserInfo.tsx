import fetcher from "@/apis/axios";
import useManageUserLogin from "@/hooks/useManageUserLogin";
import { User } from "@/types/client.types";
import { useQuery } from "@tanstack/react-query";

const requestUserData = async (userAccessToken: string) => {
  const { data: userData } = await fetcher<User>({
    method: "get",
    url: "/users/info",
    headers: { Authorization: `Bearer ${userAccessToken}`, "Content-Type": "application/json" },
  });
  return userData;
};

function useGetUserInfo() {
  const { userAccessToken } = useManageUserLogin();

  if (userAccessToken) throw Error("로그인 되어있지 않습니다.");

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => requestUserData(userAccessToken),
  });

  return userData;
}

export default useGetUserInfo;
