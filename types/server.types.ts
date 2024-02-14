import { Stars, Tag } from "./client.types";

export type Review = {
  reviewId: number;
  title: string;
  content: string;
  tagValues?: Tag;
  nickName: string;
  spotId: string;
  createdAt: string;
  modifiedAt: string;
  visitingTime: string;
  imageUrls?: string[];
  stars?: Stars;
};
