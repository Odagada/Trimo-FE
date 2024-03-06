import { dislikeReview, likeReview } from "@/apis/capsulesQuery";
import useReviewId from "@/hooks/review/useReviewId";
import useAccessTokenStore from "@/zustands/useAccessTokenStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikeReview = () => {
  const reviewId = useReviewId();

  const { accessToken } = useAccessTokenStore();

  const queryClient = useQueryClient();

  const likeReviewMutation = useMutation({
    mutationFn: (isLiked: boolean) => {
      if (isLiked) return dislikeReview(accessToken, reviewId);
      else return likeReview(accessToken, reviewId);
    },
    onMutate: async (isLiked) => {
      // 쿼리 취소하기
      await queryClient.cancelQueries({ queryKey: ["reviewIsLiked", reviewId] });
      await queryClient.cancelQueries({ queryKey: ["reviewLikeCount", reviewId] });

      // 쿼리 데이터 가져와서 백업해두기
      const prevLikeCount = queryClient.getQueryData(["reviewIsLiked", reviewId]);
      const prevLikeStatus = queryClient.getQueryData(["reviewLikeCount", reviewId]);

      // 쿼리 데이터 수정하기
      queryClient.setQueryData(["reviewLikeCount", reviewId], (prev: number) => (isLiked ? prev - 1 : prev + 1));
      queryClient.setQueryData(["reviewIsLiked", reviewId], (prev: boolean) => !prev);

      // 필요할 때 갖다 쓰기 위한 백업본 리턴하기
      return { prevLikeStatus, prevLikeCount };
    },
    onError: (err, isLiked, context) => {
      queryClient.setQueryData(["reviewIsLiked", reviewId], context?.prevLikeStatus);
      queryClient.setQueryData(["reviewLikeCount", reviewId], context?.prevLikeCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviewIsLiked", reviewId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviewLikeCount", reviewId],
      });
    },
  });

  return likeReviewMutation;
};

export default useLikeReview;
