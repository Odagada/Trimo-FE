import { ReactNode } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

export type ClickableColor = "primary" | "black" | "gray" | "white" | "white-" | "naver" | "kakao";
export type ClickableShape = "square" | "capsule";
export type ClickableSize = "large" | "medium" | "small";

export type TagMonth = "1월" | "2월" | "3월" | "4월" | "5월" | "6월" | "7월" | "8월" | "9월" | "10월" | "11월" | "12월";
export type TagWeather = "맑음" | "흐림" | "우천" | "눈";
export type TagType = "맛집" | "관광" | "휴양" | "명소";
export type TagCompanion = "가족" | "친구" | "연인" | "혼자";
export type TagWithoutMonth = TagMonth | TagType | TagCompanion;
export type Tag = TagWeather | TagMonth | TagType | TagCompanion;

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
