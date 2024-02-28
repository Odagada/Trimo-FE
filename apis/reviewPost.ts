import { Destination, Review } from "@/types/client.types";
import fetcher from "./axios";

export async function postSpots(postData: Destination) {
  const { data } = await fetcher<Destination>({
    method: "post",
    url: "/user/spots",
    headers: { "Content-Type": "application/json" },
    data: postData,
  });
  return data;
}

export async function postReviews({
  formData,
  spotId,
  apiKey,
}: {
  formData: FormData;
  spotId: string;
  apiKey: string;
}) {
  const { data } = await fetcher<Review>({
    method: "post",
    url: `/user/spots/${spotId}/reviews`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return data;
}

export async function editReviews({
  formData,
  reviewId,
  apiKey,
}: {
  formData: FormData;
  reviewId: string;
  apiKey: string;
}) {
  const { data } = await fetcher<Review>({
    method: "put",
    url: `/user/spots/reviews/${reviewId}]`,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "multipart/form-data" },
    data: formData,
  });
  return data;
}
