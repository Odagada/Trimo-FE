import { getReviewLikeCount } from "@/apis/capsulesQuery";
import useReviewId from "./useReviewId";
import { useQuery } from "@tanstack/react-query";

const useReviewLikeCount = () => {
  const reviewId = useReviewId();

  const { data } = useQuery(getReviewLikeCount(reviewId));
  const likeCount = data?.data.likeCount ?? 0;

  return likeCount;
};

export default useReviewLikeCount;
