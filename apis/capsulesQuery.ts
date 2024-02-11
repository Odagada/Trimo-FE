import { Destination, User } from "@/types/client.types";
import { Review } from "@/types/server.types";
import fetcher from "./axios";

export const getReview = (reviewId: number) => {
  return {
    queryKey: ["review", reviewId],
    queryFn: () => fetcher<Review>({ method: "get", url: `/review/${reviewId}` }),
  };
};

export const getSpot = (spotId: string) => {
  return {
    queryKey: ["spot", spotId],
    queryFn: () => fetcher<Destination>({ method: "get", url: `/review/${spotId}` }),
  };
};

export const getUser = (userId: number) => {
  return {
    queryKey: ["user", userId],
    queryFn: () => fetcher<User>({ method: "get", url: `/review/${userId}` }),
  };
};
