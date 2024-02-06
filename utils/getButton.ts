import { ButtonColor, ButtonSize } from "@/types/client.types";

export const getButtonColorValue = (color: ButtonColor) => {
  switch (color) {
    case "primary":
      return "bg-primary text-black border border-primary";
    case "black":
      return "bg-black text-white border border-black";
    case "white":
      return "bg-white text-black border border-gray-20";
    case "naver":
      return "bg-naver text-white border border-naver";
    case "kakao":
      return "bg-kakao text-black border border-kakao";
    default:
      return "";
  }
};

export const getButtonSizeValue = (size: ButtonSize) => {
  switch (size) {
    case "large":
      return "w-full text-16 font-bold leading-22 px-20 py-12";
    case "medium":
      return "text-14 font-medium leading-22 px-15 py-5";
    case "small":
      return "text-14 font-regular leading-24 px-15 py-5";
    default:
      return "";
  }
};
