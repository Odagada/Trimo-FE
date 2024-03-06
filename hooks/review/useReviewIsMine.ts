import { getUserInfo } from "@/apis/capsulesQuery";
import { useDestructureReviewData } from "./useDestructureReviewData";
import { useQuery } from "@tanstack/react-query";
import useAccessTokenStore from "@/zustands/useAccessTokenStore";

export const useReveiwIsMine = () => {
  const { accessToken } = useAccessTokenStore();
  const { nickName } = useDestructureReviewData();
  const { data: userData } = useQuery(getUserInfo(accessToken));

  const userId = userData?.data.nickName;

  return nickName === userId;
};
