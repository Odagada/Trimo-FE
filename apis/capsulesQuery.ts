import { SingleReviewData, SpotData } from "@/types/server.types";
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
