import { QueryClient } from "@tanstack/react-query";

type Context =
  | {
      prevLikeStatus: unknown;
      prevLikeCount: unknown;
    }
  | undefined;

type Props = {
  reviewId: number;
  context: Context;
  queryClient: QueryClient;
};

const LikeReviewOnError = ({ reviewId, context, queryClient }: Props) => {
  queryClient.setQueryData(["reviewIsLiked", reviewId], context?.prevLikeStatus);
  queryClient.setQueryData(["reviewLikeCount", reviewId], context?.prevLikeCount);
};

export default LikeReviewOnError;
