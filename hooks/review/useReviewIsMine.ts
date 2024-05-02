import { getUserInfo } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import useManageUserAccessToken from "../useManageUserAccessToken";
import useReviewDataAdaptor from "@/useAdaptor/Review/useReviewDataAdaptor";

export const useReviewIsMine = () => {
  const { nickName } = useReviewDataAdaptor();
  const { userAccessToken: accessToken } = useManageUserAccessToken();
  const { data: userData } = useQuery(getUserInfo(accessToken));

  const userId = userData?.data.nickName;

  return nickName === userId;
};
