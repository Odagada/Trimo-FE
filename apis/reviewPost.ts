import { Destination, Review } from "@/types/client.types";
import fetcher from "./axios";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLslYTrsJTrsJTrsJTrsJRAbmF2ZXIuY29tIiwiaWF0IjoxNzA3OTA5NTM3LCJleHAiOjE3MDc5MTMxMzd9.NgkZJd6rxr5DATtz7G6-Yq50xTNYnwYbr6SjxFU_o8M";

export async function postSpots(postData: Destination) {
  const { data } = await fetcher<Destination>({
    method: "post",
    url: "/users/spots",
    headers: { Authorization: apiKey, "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}

export async function postReviews({ postData, spotId }: { postData: Review; spotId: string }) {
  const { data } = await fetcher<Review>({
    method: "post",
    url: `/users/spots/${spotId}/reviews`,
    headers: { Authorization: apiKey, "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}
