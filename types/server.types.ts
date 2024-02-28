import { Destination, Stars, Tag } from "./client.types";

type ReviewData = {
  reviewId: number;
  title: string;
  tagValues?: Tag;
  nickName: string;
  visitingTime: string;
  stars: Stars;
};

export type SingleReviewData = {
  content: string;
  spotName: string;
  placeId: string;
  createdAt: string;
  modifiedAt: string;
  images?: string[];
} & ReviewData;

export type MultiReviewData = {
  image: string | null;
} & ReviewData;

export type ReviewLikeCount = {
  likeCount: number;
};

export type ReviewIsLiked = {
  isLiked: boolean;
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

export type reviewList = {
  reviewList: MultiReviewData[];
  totalCount: number;
};
