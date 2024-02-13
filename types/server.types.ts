import { Stars, Tag } from "./client.types";

export type Review = {
  reviewId: number;
  title: string;
  content: string;
  tagValues?: Tag;
  userId: number;
  spotId: string;
  createdAt: string;
  modifiedAt: string;
  date: string;
  imageUrls?: string[];
  stars?: Stars;
};
