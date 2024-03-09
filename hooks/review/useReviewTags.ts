import { TagWithMonth } from "@/types/client.types";
import { useDestructureReviewData } from "./useDestructureReviewData";
import useReviewTimes from "./useReviewTimes";

const useReviewTags = () => {
  const { tagMonth } = useReviewTimes();
  const { reviewTag } = useDestructureReviewData();

  const tags: TagWithMonth[] = [tagMonth, ...Object.values(reviewTag)];

  return tags;
};

export default useReviewTags;
