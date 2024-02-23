import { Destination, Review } from "@/types/client.types";
import fetcher from "./axios";

//apiKey 수정하기
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHRAdHR0dC50dHQiLCJpYXQiOjE3MDgzMzY0NjUsImV4cCI6MTcwODM0MDA2NX0.fTk8_vcs2LjGhx7dqY5wSA9He6pNWyzQygiK-sJEkgU";

export async function postSpots(postData: Destination) {
  const { data } = await fetcher<Destination>({
    method: "post",
    url: "/user/spots",
    headers: { Authorization: apiKey, "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}

export async function postReviews({ formData, spotId }: { formData: FormData; spotId: string }) {
  const { data } = await fetcher<Review>({
    method: "post",
    url: `/user/spots/${spotId}/reviews`,
    headers: { Authorization: apiKey, "Content-Type": "multipart/form-data" },
    data: formData,
  });
  return data;
}
