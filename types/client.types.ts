import { ReactNode } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

export type Stars = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type ClickableColor = "primary" | "black" | "gray" | "white" | "white-" | "naver" | "kakao";
export type ClickableShape = "square" | "capsule";
export type ClickableSize = "large" | "medium" | "small";

export type TagMonth = "1월" | "2월" | "3월" | "4월" | "5월" | "6월" | "7월" | "8월" | "9월" | "10월" | "11월" | "12월";
export type TagWeather = "맑음" | "흐림" | "우천" | "눈";
export type TagPlaceType = "맛집" | "관광" | "휴양" | "명소";
export type TagCompanion = "가족" | "친구" | "연인" | "혼자";
export type Tag = {
  weather?: TagWeather;
  placeType?: TagPlaceType;
  companion?: TagCompanion;
};
export type TagWithMonth = TagWeather | TagMonth | TagPlaceType | TagCompanion;

export type NavStatus = "LoggedIn" | "LoggedOut" | "onlyLogo";

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

export type Destination = {
  name: string;
  formattedAddress: string;
  placeId: string;
  location: {
    latitude: string;
    longitude: string;
  };
};

export type User = {
  userId: number;
  nickName: string;
  email: string;
  gender: "female" | "male";
  age: number;
};

export type Review = {
  title: string;
  content: string;
  tagValues?: Tag;
  visitingTime: string;
  stars?: Stars;
};

export type ImageType = {
  name: string;
  url: string;
};

export type OrderValue = "인기순" | "평점순" | "최신순";
