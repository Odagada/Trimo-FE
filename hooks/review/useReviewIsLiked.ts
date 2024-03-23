import useReviewId from "./useReviewId";
import { getReviewIsLiked } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import useManageUserAccessToken from "../useManageUserAccessToken";

const useReviewIsLiked = () => {
  const reviewId = useReviewId();

  const { userAccessToken: accessToken } = useManageUserAccessToken();

  const { data } = useQuery(getReviewIsLiked(accessToken, reviewId));
  const isLiked = data?.data?.isLiked ?? false;

  return isLiked;
};

export default useReviewIsLiked;
