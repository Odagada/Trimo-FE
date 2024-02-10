import { Destination, User } from "@/types/client.types";
import { Review } from "@/types/server.types";
import fetcher from "./axios";

export const getReview = (review_id: number) => {
  return {
    queryKey: ["review", review_id],
    queryFn: () => fetcher<Review>({ method: "get", url: `/review/${review_id}` }),
  };
};

export const getSpot = (spot_id: string) => {
  return {
    queryKey: ["spot", spot_id],
    queryFn: () => fetcher<Destination>({ method: "get", url: `/review/${spot_id}` }),
  };
};

export const getUser = (user_id: number) => {
  return {
    queryKey: ["user", user_id],
    queryFn: () => fetcher<User>({ method: "get", url: `/review/${user_id}` }),
  };
};
