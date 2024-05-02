import makeToast from "@/utils/makeToast";
import { QueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";

type Props = {
  queryClient: QueryClient;
  router: NextRouter;
};

const DeleteReviewOnSuccess = ({ queryClient, router }: Props) => {
  queryClient.invalidateQueries({ queryKey: ["review"] });
  makeToast("삭제가 완료되었습니다!");
  router.push("/");
};

export default DeleteReviewOnSuccess;
