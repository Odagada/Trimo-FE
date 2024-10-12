import { getReview } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import useReviewId from "./useReviewId";

export const useDestructureReviewData = () => {
  // reviewId 확인
  const reviewId = useReviewId();

  // 필요한 query 호출
  const { data: reviewData } = useQuery(getReview(reviewId));

  return {
    title: reviewData?.data.title ?? "",
    nickName: reviewData?.data.nickName ?? "",
    spotName: reviewData?.data.spotName ?? "",

    imageUrlArray: reviewData?.data.images ?? [],
    placeId: reviewData?.data.placeId ?? "",

    stars: reviewData?.data.stars ?? 0,
    weather: reviewData?.data.tagValues?.weather ?? "",

    content: reviewData?.data.content ?? "",

    travelDate: reviewData?.data.visitingTime ?? "",
    createDate: reviewData?.data.createdAt ?? "",
    reviewTag: reviewData?.data.tagValues ?? {},
  };
};
