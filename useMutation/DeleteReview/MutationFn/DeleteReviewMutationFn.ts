import fetcher from "@/apis/axios";

type Props = {
  accessToken: string;
  reviewId: number;
};

const DeleteReviewMutationFn = ({ accessToken, reviewId }: Props) =>
  fetcher({
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `/user/reviews/${reviewId}`,
  });

export default DeleteReviewMutationFn;
