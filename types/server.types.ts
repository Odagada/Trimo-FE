import { Destination, Stars, Tag } from "./client.types";

export type Review = {
  review_id: number;
  user_id: number;
  spot_id: string;
  title: string;
  date: string;
  destination: Destination;
  imageUrls?: string[];
  description: string;
  stars?: Stars;
  tag?: Tag;
  createdAt: string;
  likeUserId: number[];
};
