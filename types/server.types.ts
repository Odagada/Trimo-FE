import { Destination, Stars, TagCompanion, TagWeather, TagPlaceType } from "./client.types";

export type SingleReviewData = {
  reviewId: number;
  title: string;
  content: string;
  weather: TagWeather;
  companion: TagCompanion;
  placeType: TagPlaceType;
  nickName: string;
  spotId: string;
  createdAt: string;
  modifiedAt: string;
  visitingTime: string;
  imageUrls?: string[];
  stars?: Stars;
};

export type SpotData = {
  averageStars: Stars;
} & Destination;
