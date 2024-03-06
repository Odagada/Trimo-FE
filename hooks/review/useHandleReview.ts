import useDeleteReview from "@/querise/useDeleteReview";
import makeToast from "@/utils/makeToast";
import useReviewId from "./useReviewId";
import { useRouter } from "next/router";

const useHandleReview = () => {
  const reviewId = useReviewId();
  const router = useRouter();

  const { deleteReviewMutation } = useDeleteReview();

  const handleClipboard = () => {
    navigator.clipboard.writeText(`https://www.trimo.kr/review/${reviewId}`);
    makeToast("링크가 복사되었습니다!");
  };

  const handleReviewEdit = () => router.push(`/review/${reviewId}/edit`);

  return { deleteReviewMutation, handleClipboard, handleReviewEdit };
};

export default useHandleReview;
