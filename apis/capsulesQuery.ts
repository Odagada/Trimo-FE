import {
  MultiReviewData,
  ReviewLikeCount,
  SingleReviewData,
  SpotData,
  searchReview,
  GetMyPlacesType,
  ReviewIsLiked,
} from "@/types/server.types";
import fetcher from "./axios";
import { User } from "@/types/client.types";

export const getUserInfo = (accessToken: string) => {
  return {
    queryKey: ["userInfo"],
    queryFn: () =>
      fetcher<User>({
        method: "get",
        url: `/user/info`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    enabled: !!accessToken,
  };
};

export const getReview = (reviewId: number) => {
  return {
    queryKey: ["review", reviewId],
    queryFn: () =>
      fetcher<SingleReviewData>({
        method: "get",
        url: `/main/spots/reviews/${reviewId}`,
      }),
  };
};

export const likeReview = (accessToken: string, reviewId: number) => {
  return fetcher({
    method: "post",
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `/user/reviews/like/${reviewId}`,
  });
};

export const dislikeReview = (accessToken: string, reviewId: number) => {
  return fetcher({
    method: "delete",
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `/user/reviews/like/${reviewId}`,
  });
};

// 좋아요 갯수
export const getReviewLikeCount = (reviewId: number) => {
  return {
    queryKey: ["reviewLikeCount", reviewId],
    queryFn: () =>
      fetcher<ReviewLikeCount>({
        method: "get",
        url: `/user/reviews/${reviewId}/like/count`,
      }),
  };
};

// 좋아요 여부
export const getReviewIsLiked = (accessToken: string, reviewId: number) => {
  return {
    queryKey: ["reviewIsLiked", reviewId],
    queryFn: () =>
      fetcher<ReviewIsLiked>({
        method: "get",
        url: `/user/reviews/${reviewId}/like`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    enabled: !!accessToken,
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
      fetcher<searchReview>({
        method: "get",
        url: `main/reviews/specifics?${query}&page=1`,
      }),
    enabled: query !== "",
  };
};

export const getReviewCardArray = (order: string) => {
  return {
    queryKey: ["reviewCards", order],
    queryFn: () =>
      fetcher<MultiReviewData[]>({
        method: "get",
        url: `/main/reviews?order=${order}`,
      }),
  };
};

export const getMyPlaces = (accessToken: string) => {
  return {
    queryKey: ["myPlace", accessToken],
    queryFn: () =>
      fetcher<GetMyPlacesType>({
        method: "get",
        url: "/user/me/places",
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  };
};

export const getFilteredMyPlaces = (accessToken: string, query: string | null) => {
  return {
    queryKey: ["myFilteredPlace", accessToken, query],
    queryFn: () =>
      fetcher<MultiReviewData[]>({
        method: "get",
        url: `/user/me/reviews?${query}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    keepPreviousData: true,
    enabled: query !== null,
  };
};
