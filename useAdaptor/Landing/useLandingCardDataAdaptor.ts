import { getReviewCardArray } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";

const useLandingCardDataAdaptor = () => {
  const { data: recentData } = useQuery(getReviewCardArray("RECENT"));
  const { data: popularData } = useQuery(getReviewCardArray("POPULAR"));

  const recentReviewCardArray = recentData?.data ?? [];
  const popularReviewCardArray = popularData?.data ?? [];

  return { recentReviewCardArray, popularReviewCardArray };
};

export default useLandingCardDataAdaptor;
