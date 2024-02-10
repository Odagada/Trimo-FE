import { Stars, Tag, TagCompanion, TagType, TagWeather } from "./client.types";

export type Review = {
  review_id: number;
  user_id: number;
  spot_id: string;
  title: string;
  date: string;
  imageUrls?: string[];
  description: string;
  stars?: Stars;
  tag?: Tag;
  createdAt: string;
  likeUserId: number[];
};
