import { TagWithMonth } from "@/types/client.types";
import useReviewTimes from "./useReviewTimes";
import useReviewDataAdaptor from "@/useAdaptor/Review/useReviewDataAdaptor";

const useReviewTags = () => {
  const { tagMonth } = useReviewTimes();
  const { reviewTag } = useReviewDataAdaptor();

  const tags: TagWithMonth[] = [tagMonth, ...Object.values(reviewTag)];

  return tags;
};

export default useReviewTags;
