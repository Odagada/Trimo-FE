import { getReviewIsLiked } from "@/apis/capsulesQuery";
import useReviewId from "@/hooks/review/useReviewId";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { useQuery } from "@tanstack/react-query";

const useReviewIsLikedAdaptor = () => {
  const reviewId = useReviewId();
  const { userAccessToken: accessToken } = useManageUserAccessToken();

  const { data } = useQuery(getReviewIsLiked(accessToken, reviewId));
  const isLiked = data?.data?.isLiked ?? false;

  return isLiked;
};

export default useReviewIsLikedAdaptor;
