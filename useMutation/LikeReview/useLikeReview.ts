import { dislikeReview, likeReview } from "@/apis/capsulesQuery";
import useReviewId from "@/hooks/review/useReviewId";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LikeReviewMutationFn from "./MutationFn/LikeReviewMutationFn";
import LikeReviewOnMutate from "./MutationFn/LikeReviewOnMutate";
import LikeReviewOnSettled from "./MutationFn/LikeReviewOnSettled";
import LikeReviewOnError from "./MutationFn/LikeReviewOnError";
import { NextRouter } from "next/router";

type Props = {
  reviewId: number;
  accessToken: string;
};

const useLikeReview = ({ reviewId, accessToken }: Props) => {
  const queryClient = useQueryClient();

  const likeReviewMutation = useMutation({
    mutationFn: (isLiked: boolean) => LikeReviewMutationFn({ isLiked, accessToken, reviewId }),
    onMutate: async (isLiked) => LikeReviewOnMutate({ isLiked, queryClient, reviewId }),
    onError: (err, isLiked, context) => LikeReviewOnError({ reviewId, context, queryClient }),
    onSettled: () => LikeReviewOnSettled({ queryClient, reviewId }),
  });

  return likeReviewMutation;
};

export default useLikeReview;
