import { Destination, Stars, Tag } from "./client.types";

export type SingleReviewData = {
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

export type MultiReviewData = {
  reviewId: number;
  title: string;
  tagValues?: Tag;
  nickName: string;
  visitingTime: string;
  imageUrls?: string[];
  stars?: Stars;
};

export type SpotData = {
  averageStars: Stars;
} & Destination;

export type UserAdditionalInfo = {
  birthDate: string;
  gender: string;
  nickName: string;
};

export type UserSocialLoginData = {
  id: number;
  email: string;
  nickName: string;
  imageUrl: string;
  role: string; //ROLE_USER, ROLE_GUEST
  tokenType: string;
  accessToken: string;
};

export type UserInfoType = {
  email: string;
  nickName: string;
  imageUrl: string;
  gender: "남자" | "여자";
  birthDate: string;
  role: string;
};
