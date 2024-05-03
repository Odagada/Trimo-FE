import { getReview } from "@/apis/capsulesQuery";
import useReviewId from "@/hooks/review/useReviewId";
import { TagMonth, TagWithMonth } from "@/types/client.types";
import { SingleReviewData } from "@/types/server.types";
import calcData from "@/utils/calcDate";
import { useQuery } from "@tanstack/react-query";

type Data<T> = { data: T; status: number } | undefined;

const useReviewDataAdaptor = () => {
  const reviewId = useReviewId();
  const { data } = useQuery(getReview(reviewId));

  const { tagMonth, dateString, timeString, createdAt } = useDateAdaptor(data);
  const { tags } = useTagAdaptor(data, tagMonth);

  const reviewData = {
    title: data?.data.title ?? "",
    nickName: data?.data.nickName ?? "",
    spotName: data?.data.spotName ?? "",

    imageUrlArray: data?.data.images ?? [],
    placeId: data?.data.placeId ?? "",

    stars: data?.data.stars ?? 0,
    weather: data?.data.tagValues?.weather ?? "",

    content: data?.data.content ?? "",

    tags,
    tagMonth,
    dateString,
    timeString,
    createdAt,
  };

  return reviewData;
};

const useDateAdaptor = (data: Data<SingleReviewData>) => {
  const travelDate = data?.data.visitingTime ?? "";
  const createDate = data?.data.createdAt ?? "";
  const { tagMonth, dateString, timeString } = calcData(travelDate);
  const { dateString: createdAt } = calcData(createDate);

  return { tagMonth, dateString, timeString, createdAt };
};

const useTagAdaptor = (data: Data<SingleReviewData>, tagMonth: TagMonth) => {
  const reviewTag = data?.data.tagValues ?? {};
  const tags: TagWithMonth[] = [tagMonth, ...Object.values(reviewTag)];

  return { tags };
};

export default useReviewDataAdaptor;
