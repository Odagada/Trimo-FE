import { Destination } from "@/types/client.types";
import { Review } from "@/types/server.types";
import fetcher from "./axios";

export const getReview = (reviewId: number) => {
  return {
    queryKey: ["review", reviewId],
    queryFn: () => fetcher<Review>({ method: "get", url: `/users/spots/reviews/${reviewId}` }),
  };
};

export const getSpot = (spotId: string) => {
  return {
    queryKey: ["spot", spotId],
    queryFn: () => fetcher<Destination>({ method: "get", url: `users/spots/${spotId}` }),
  };
};
