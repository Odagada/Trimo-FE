import { QueryClient } from "@tanstack/react-query";

type Props = { queryClient: QueryClient; reviewId: number };

const LikeReviewOnSettled = ({ queryClient, reviewId }: Props) => {
  queryClient.invalidateQueries({
    queryKey: ["reviewIsLiked", reviewId],
  });
  queryClient.invalidateQueries({
    queryKey: ["reviewLikeCount", reviewId],
  });
};

export default LikeReviewOnSettled;
