import { dislikeReview, likeReview } from "@/apis/capsulesQuery";

type Props = { isLiked: boolean; accessToken: string; reviewId: number };

const LikeReviewMutationFn = ({ isLiked, accessToken, reviewId }: Props) => {
  if (isLiked) return dislikeReview(accessToken, reviewId);
  else return likeReview(accessToken, reviewId);
};

export default LikeReviewMutationFn;
