import { Destination, Review } from "@/types/client.types";
import fetcher from "./axios";

//apiKey 수정하기
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHR0QHR0dC50dHQiLCJpYXQiOjE3MDgzMjQ0MTQsImV4cCI6MTcwODMyODAxNH0.0sKspRy1TWDo0KqXBt5t55azCP0qVW5n8kK4LULtd8o";

export async function postSpots(postData: Destination) {
  const { data } = await fetcher<Destination>({
    method: "post",
    url: "/users/spots",
    headers: { Authorization: apiKey, "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}

export async function postReviews({ formData, spotId }: { formData: FormData; spotId: string }) {
  const { data } = await fetcher<Review>({
    method: "post",
    url: `/users/spots/${spotId}/reviews`,
    headers: { Authorization: apiKey, "Content-Type": "multipart/form-data" },
    data: formData,
  });
  return data;
}
