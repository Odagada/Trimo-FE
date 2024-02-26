import { MultiReviewData, SingleReviewData, SingleReviewLikes, SpotData } from "@/types/server.types";
import fetcher from "./axios";

export const getReview = (reviewId: number) => {
  return {
    queryKey: ["review", reviewId],
    queryFn: () => fetcher<SingleReviewData>({ method: "get", url: `/main/spots/reviews/${reviewId}` }),
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
        url: `main/reviews/specifics?${query}`,
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

export const getReviewLikes = (reviewId: number, accessToken: string) => {
  return {
    queryKey: ["review", "likes", reviewId],
    queryFn: () =>
      fetcher<SingleReviewLikes>({
        method: "post",
        url: `/user/reviews/like/${reviewId}`,
        headers: { Authorization: accessToken },
      }),
  };
};

export const postReviewLikes = (reviewId: number, accessToken: string) => {
  fetcher({
    method: "post",
    url: `/user/reviews/like/${reviewId}`,
    headers: { Authorization: accessToken },
  });
};

export const deleteReviewlikes = (reviewId: number, accessToken: string) => {
  fetcher({
    method: "delete",
    url: `/user/reviews/like/${reviewId}`,
    headers: { Authorization: accessToken },
  });
};
