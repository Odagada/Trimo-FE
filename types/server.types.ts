import { Stars, Tag } from "./client.types";

export type Review = {
  userId: number;
  spotId: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  imageUrls?: string[];
  stars?: Stars;
  tag?: Tag;
  // likeUserId: number[];
};
