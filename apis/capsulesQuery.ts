import { MultiReviewData, ReviewLikeCount, SingleReviewData, SpotData } from "@/types/server.types";
import fetcher from "./axios";
import { User } from "@/types/client.types";

export const getUserInfo = (accessToken: string) => {
  return {
    queryKey: ["userInfo"],
    queryFn: () =>
      fetcher<User>({ method: "get", url: `/user/info`, headers: { Authorization: `Bearer ${accessToken}` } }),
  };
};

export const getReview = (reviewId: number) => {
  return {
    queryKey: ["review", reviewId],
    queryFn: () => fetcher<SingleReviewData>({ method: "get", url: `/main/spots/reviews/${reviewId}` }),
  };
};

export const getReviewLikeCount = (reviewId: number) => {
  return {
    queryKey: ["reviewLikeCount", reviewId],
    queryFn: () => fetcher<ReviewLikeCount>({ method: "get", url: `/user/reviews/${reviewId}/like/count` }),
  };
};

export const getReviewIsLiked = (accessToken: string, reviewId: number) => {
  return {
    queryKey: ["reviewIsLiked", reviewId],
    queryFn: () =>
      fetcher<ReviewLikeCount>({
        method: "get",
        url: `/user/reviews/${reviewId}/like`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  };
};

export const getSpot = (spotId: string) => {
  return {
    queryKey: ["spot", spotId],
    queryFn: () => fetcher<SpotData>({ method: "get", url: `/main/spots/${spotId}` }),
  };
};

export const getSearchReview = (query: string) => {
  return {
    queryKey: ["reviewList", query],
    queryFn: () =>
      fetcher<MultiReviewData[]>({
        method: "get",
        url: `main/reviews/specifics?${query}&page=1`,
      }),
    enabled: query !== "",
  };
};

export const getReviewCardArray = (order: string) => {
  return {
    queryKey: ["reviewCards", order],
    queryFn: () => fetcher<MultiReviewData[]>({ method: "get", url: `/main/reviews?order=${order}` }),
  };
};
