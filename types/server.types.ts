import { Destination, Stars, Tag } from "./client.types";

export type SingleReviewData = {
  reviewId: number;
  title: string;
  content: string;
  tagValues?: Tag;
  nickName: string;
  spotName: string;
  placeId: string;
  createdAt: string;
  modifiedAt: string;
  visitingTime: string;
  images?: string[];
  stars: Stars;
};

export type MultiReviewData = {
  reviewId: number;
  title: string;
  tagValues?: Tag;
  nickName: string;
  visitingTime: string;
  stars: Stars;
  image: string | null;
};

export type SpotData = {
  averageStars: Stars;
} & Destination;

export type GuestUpdateType = {
  birthDate: string;
  gender: string;
  nickName: string;
};

export type GetGuestUpdateType = {
  nickName: string;
  imageUrl: string;
  gender: string;
  birthDate: string;
  role: string;
};

export type LoginOauthType = {
  id: number;
  nickName: string;
  imageUrl: string;
  role: string; //ROLE_USER, ROLE_GUEST
  tokenType: string;
  accessToken: string;
};

export type GetUserInfoType = {
  userId: number;
  nickName: string;
  gender: string;
  age: number;
  imageUrl: string;
};

export type UserUpdateType = {
  nickName: string;
  birthDate: string;
  gender: string;
};

export type GetUserUpdateType = {
  nickName: string;
  imageUrl: string;
  gender: string;
  age: number;
  role: string;
};

export type GetMyPlacesType = {
  placeIds: string[];
};
