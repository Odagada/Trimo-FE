import { ClickableColor, ClickableSize } from "@/types/client.types";

export const getClickableColorValue = (color: ClickableColor) => {
  switch (color) {
    case "black":
      return "bg-black text-white border border-black";
    case "gray":
      return "bg-gray-30 text-white border border-gray-40";
    case "white":
      return "bg-white text-black border border-gray-50";
    case "white-":
      return "bg-white text-gray-40 border border-gray-40";
    case "naver":
      return "bg-naver text-white border border-naver";
    case "kakao":
      return "bg-kakao text-black border border-kakao";
    case "primary":
      return "bg-primary text-white border border-primary";
    default:
      return "";
  }
};

export const getClickableSizeValue = (size: ClickableSize) => {
  switch (size) {
    case "large":
      return "max-w-550 w-full font-bold leading-22 py-12";
    case "medium":
      return "max-w-210 w-full font-bold leading-22 py-12";
    case "small":
      return "font-regular leading-24 px-15 py-5";
    default:
      return "";
  }
};
