import { GetMyPlacesType, MultiReviewData, SingleReviewData, SpotData } from "@/types/server.types";
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
    enabled: query !== null,
  };
};
