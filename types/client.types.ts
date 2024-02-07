import { ReactNode } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

export type ClickableColor = "primary" | "black" | "white" | "naver" | "kakao";
export type ClickableShape = "square" | "capsule";
export type ClickableSize = "large" | "medium" | "small";

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
