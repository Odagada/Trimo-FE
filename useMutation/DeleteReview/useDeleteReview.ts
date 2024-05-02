import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import DeleteReviewMutationFn from "./MutationFn/DeleteReviewMutationFn";
import DeleteReviewOnSuccess from "./MutationFn/DeleteReviewOnSuccess";

type Props = {
  accessToken: string;
  reviewId: number;
  router: NextRouter;
};
const useDeleteReview = ({ accessToken, reviewId, router }: Props) => {
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: () => DeleteReviewMutationFn({ accessToken, reviewId }),
    onSuccess: () => DeleteReviewOnSuccess({ queryClient, router }),
  });

  return deleteReviewMutation;
};

export default useDeleteReview;
