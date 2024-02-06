import { ButtonColor, ButtonSize } from "@/types/client.types";

export const getButtonColorValue = (color: ButtonColor) => {
  switch (color) {
    case "primary":
      return "bg-primary text-black";
    case "black":
      return "bg-black text-white";
    case "white":
      return "bg-white text-black border border-gray-20";
    case "naver":
      return "bg-naver text-white";
    case "kakao":
      return "bg-kakao text-black";
    default:
      return "";
  }
};

export const getButtonSizeValue = (size: ButtonSize) => {
  switch (size) {
    case "large":
      return "text-16 font-bold leading-22 px-20 py-12";
    case "medium":
      return "text-14 font-medium px-15 py-5";
    case "small":
      return "text-14 font-regular  px-15 py-5";
    default:
      return "";
  }
};
