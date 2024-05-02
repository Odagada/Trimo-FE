import { getReview } from "@/apis/capsulesQuery";
import useReviewId from "@/hooks/review/useReviewId";
import { useQuery } from "@tanstack/react-query";

const useReviewDataAdaptor = () => {
  // reviewId 확인
  const reviewId = useReviewId();

  // 필요한 query 호출
  const { data } = useQuery(getReview(reviewId));

  const reviewData = {
    title: data?.data.title ?? "",
    nickName: data?.data.nickName ?? "",
    spotName: data?.data.spotName ?? "",

    imageUrlArray: data?.data.images ?? [],
    placeId: data?.data.placeId ?? "",

    stars: data?.data.stars ?? 0,
    weather: data?.data.tagValues?.weather ?? "",

    content: data?.data.content ?? "",

    travelDate: data?.data.visitingTime ?? "",
    createDate: data?.data.createdAt ?? "",
    reviewTag: data?.data.tagValues ?? {},
  };

  return reviewData;
};

export default useReviewDataAdaptor;
