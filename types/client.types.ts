import { ReactNode } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

export type Stars = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type ClickableColor = "primary" | "black" | "gray" | "white" | "white-" | "naver" | "kakao";
export type ClickableShape = "square" | "capsule";
export type ClickableSize = "large" | "medium" | "small";

export type TagMonth = "1월" | "2월" | "3월" | "4월" | "5월" | "6월" | "7월" | "8월" | "9월" | "10월" | "11월" | "12월";
export type TagWeather = "맑음" | "흐림" | "우천" | "눈";
export type TagType = "맛집" | "관광" | "휴양" | "명소";
export type TagCompanion = "가족" | "친구" | "연인" | "혼자";
export type TagWithoutMonth = TagMonth | TagType | TagCompanion;
export type Tag = TagWeather | TagMonth | TagType | TagCompanion;

export type NavStatus = "LoggedIn" | "LoggedOut" | "onlyLogo";

export interface Children {
  children: ReactNode;
}

export type InputProps = {
  id: string;
  type?: string;
  name?: string;
  placeholder?: string | undefined;
  onBlur: ChangeHandler;
  onChange: ChangeHandler;
  eyesValue?: boolean;
  onEyesToggle?: () => void;
};

export type TextAreaProps = Omit<InputProps, "type">;

export type WrapperProps = {
  title?: string;
  htmlFor: string;
  errors?: FieldError | undefined;
};

export type InputWrapperProps = {
  children: ReactNode;
  className?: string;
  divOptions?: string;
} & WrapperProps;

export type ReviewType = {
  reviewId: number;
  title: string;
  author: string;
  imageUrls: string[];
  tag: [TagMonth, TagType, TagCompanion, TagWeather];
  rate: number;
  date: string;
  destination: string;
  description: string;
  createdAt: string;
  likeUserId: number[];
};

export type ImageType = {
  name: string;
  url: string;
};

export type OrderValue = "인기순" | "평점순" | "최신순";

export type UserAdditionalInfo = {
  birthDate: string;
  gender: string;
  nickName: string;
};

export type UserInfoType = {
  email: string;
  nickName: string;
  imageUrl: string;
  gender: string;
  birthDate: string;
  role: string;
};
export type birthdateValType = { value: number; label: number };
