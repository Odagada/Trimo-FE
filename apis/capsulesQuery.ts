import { SingleReviewData, SpotData } from "@/types/server.types";
import fetcher from "./axios";

export const getReview = (reviewId: number) => {
  return {
    queryKey: ["review", reviewId],
    queryFn: () => fetcher<SingleReviewData>({ method: "get", url: `/users/spots/reviews/${reviewId}` }),
  };
};

export const getSpot = (spotId: string) => {
  return {
    queryKey: ["spot", spotId],
    queryFn: () => fetcher<SpotData>({ method: "get", url: `users/spots/${spotId}` }),
  };
};

export const getReviewList = () => {
  return {
    queryKey: ["reviewList"],
    queryFn: () => fetcher<Review[]>({ method: "get", url: "main/reviews" }),
  };
};
