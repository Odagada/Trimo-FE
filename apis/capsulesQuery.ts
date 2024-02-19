import { Destination } from "@/types/client.types";
import { SingleReviewData } from "@/types/server.types";
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
    queryFn: () => fetcher<Destination>({ method: "get", url: `users/spots/${spotId}` }),
  };
};

export const getReviewList = (query: string) => {
  console.log("func: ", query);
  return {
    queryKey: ["reviewList", query],
    queryFn: () =>
      fetcher<SingleReviewData[]>({
        method: "get",
        url: `main/reviews/specifics?${query}`,
      }),
  };
};
