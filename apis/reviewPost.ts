import { Destination, Review } from "@/types/client.types";
import fetcher from "./axios";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHRAdHR0LnR0dCIsImlhdCI6MTcwODA5NjM5NywiZXhwIjoxNzA4MDk5OTk3fQ.thbCLb0KKbXAdRZZQuYFo2ei3PD_E3gL72kIZ5V1pNk";

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
    headers: { Authorization: apiKey, "Content-Type": "multipart/form-data" },
    data: postData,
  });
  return data;
}
