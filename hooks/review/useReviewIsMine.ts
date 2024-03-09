import { getUserInfo } from "@/apis/capsulesQuery";
import { useDestructureReviewData } from "./useDestructureReviewData";
import { useQuery } from "@tanstack/react-query";
import useManageUserAccessToken from "../useManageUserAccessToken";

export const useReveiwIsMine = () => {
  const { userAccessToken: accessToken } = useManageUserAccessToken();
  const { nickName } = useDestructureReviewData();
  const { data: userData } = useQuery(getUserInfo(accessToken));

  const userId = userData?.data.nickName;

  return nickName === userId;
};
