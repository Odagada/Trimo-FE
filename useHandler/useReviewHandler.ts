import useDeleteReview from "@/useMutation/DeleteReview/useDeleteReview";
import useLikeReview from "@/useMutation/LikeReview/useLikeReview";
import makeToast from "@/utils/makeToast";
import useReviewId from "../hooks/review/useReviewId";
import { useRouter } from "next/router";
import useManageUserAccessToken from "../hooks/useManageUserAccessToken";

const useReviewHandler = () => {
  const { userAccessToken: accessToken } = useManageUserAccessToken();
  const router = useRouter();
  const reviewId = useReviewId();

  const deleteReviewMutation = useDeleteReview({ accessToken, reviewId, router });
  const likeReviewMutation = useLikeReview({ reviewId, accessToken });

  const handleClipboard = () => {
    navigator.clipboard.writeText(`https://www.trimo.kr/review/${reviewId}`);
    makeToast("링크가 복사되었습니다!");
  };

  const handleReviewEdit = () => router.push(`/review/${reviewId}/edit`);

  return { deleteReviewMutation, likeReviewMutation, handleClipboard, handleReviewEdit };
};

export default useReviewHandler;
