import { useRouter } from "next/router";

const useReviewId = () => {
  const router = useRouter();
  const { id } = router.query;
  const reviewId = Number(id);

  if (id) return reviewId;
  else return 0;
};

export default useReviewId;
