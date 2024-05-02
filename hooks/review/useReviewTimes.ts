import useReviewDataAdaptor from "@/useAdaptor/Review/useReviewDataAdaptor";
import calcData from "@/utils/calcDate";

const useReviewTimes = () => {
  const { travelDate, createDate } = useReviewDataAdaptor();

  const { tagMonth, dateString, timeString } = calcData(travelDate);
  const { dateString: createdAt } = calcData(createDate);

  return { tagMonth, dateString, timeString, createdAt };
};

export default useReviewTimes;
