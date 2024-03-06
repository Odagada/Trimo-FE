import useAccessTokenStore from "@/zustands/useAccessTokenStore";
import useReviewId from "./useReviewId";
import { getReviewIsLiked } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";

const useReviewIsLiked = () => {
  const reviewId = useReviewId();

  const { accessToken } = useAccessTokenStore();

  const { data } = useQuery(getReviewIsLiked(accessToken, reviewId));
  const isLiked = data?.data.isLiked ?? false;

  return isLiked;
};

export default useReviewIsLiked;
