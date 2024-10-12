import calcData from "@/utils/calcDate";
import { useDestructureReviewData } from "./useDestructureReviewData";

const useReviewTimes = () => {
  const { travelDate, createDate } = useDestructureReviewData();

  const { tagMonth, dateString, timeString } = calcData(travelDate);
  const { dateString: createdAt } = calcData(createDate);

  return { tagMonth, dateString, timeString, createdAt };
};

export default useReviewTimes;
