import fetcher from "@/apis/axios";
import useReviewId from "@/hooks/review/useReviewId";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import makeToast from "@/utils/makeToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDeleteReview = () => {
  const { userAccessToken: accessToken } = useManageUserAccessToken();
  const reviewId = useReviewId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: () =>
      fetcher({
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
        url: `/user/reviews/${reviewId}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
      makeToast("삭제가 완료되었습니다!");
      router.push("/");
    },
  });

  return deleteReviewMutation;
};

export default useDeleteReview;
