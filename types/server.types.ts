import { Destination, TagCompanion, TagType, TagWeather, TagWithoutMonth } from "./client.types";

export type Review = {
  review_id: number;
  user_id: number;
  spot_id: string;
  title: string;
  date: string;
  destination: Destination;
  imageUrls?: string[];
  description: string;
  tag?: {
    weather?: TagWeather;
    type?: TagType;
    companion?: TagCompanion;
  };
  createdAt: string;
  likeUserId: number[];
};
