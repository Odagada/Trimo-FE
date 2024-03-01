import { getReview, getUserInfo } from "@/apis/capsulesQuery";
import { TagWithMonth } from "@/types/client.types";
import calcData from "@/utils/calcDate";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useReviewId = () => {
  const router = useRouter();
  const { id } = router.query;
  const reviewId = Number(id);

  return reviewId;
};

export const useIsMine = (accessToken: string) => {
  const { reviewData } = useDestructureReviewData();
  const { data: userData } = useQuery(getUserInfo(accessToken));

  const reviewAuthorId = reviewData?.data.nickName;
  const userId = userData?.data.nickName;

  return reviewAuthorId === userId;
};

export const useDestructureReviewData = () => {
  // reviewId 확인
  const reviewId = useReviewId();

  // 필요한 query 호출
  const { data: reviewData } = useQuery(getReview(reviewId));

  const imageUrlArray = reviewData?.data.images ?? [];
  const placeId = reviewData?.data.placeId ?? "";

  const travelDate = reviewData?.data.visitingTime ?? "";
  const createDate = reviewData?.data.createdAt ?? "";

  const { tagMonth, dateString, timeString } = calcData(travelDate);
  const { dateString: createdAt } = calcData(createDate);
  const reviewTag = reviewData?.data.tagValues ?? {};
  const tag: TagWithMonth[] = [tagMonth, ...Object.values(reviewTag)];

  return {
    reviewData,
    imageUrlArray,
    tag,
    placeId,
    createdAt,
    dateString,
    timeString,
  };
};
