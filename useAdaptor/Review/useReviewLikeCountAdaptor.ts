import { getReviewLikeCount } from "@/apis/capsulesQuery";
import useReviewId from "@/hooks/review/useReviewId";
import { useQuery } from "@tanstack/react-query";

const useReviewLikeCountAdaptor = () => {
  const reviewId = useReviewId();

  const { data } = useQuery(getReviewLikeCount(reviewId));
  const likeCount = data?.data?.likeCount ?? 0;

  return likeCount;
};

export default useReviewLikeCountAdaptor;
