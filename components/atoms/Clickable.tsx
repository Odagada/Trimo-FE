import { ClickableColor, ClickableShape, ClickableSize } from "@/types/client.types";
import { ReactNode } from "react";

const Clickable = ({
  children,
  className = "",
  color = "black",
  shape = "square",
  size = "large",
}: {
  children: ReactNode;
  className?: string;
  color?: ClickableColor;
  shape?: ClickableShape;
  size?: ClickableSize;
}) => {
  const ClickableColor = getClickableColorValue(color);
  const ClickableSize = getClickableSizeValue(size);

  return (
    <span
      className={`
        ${ClickableColor}
        ${shape === "square" ? "rounded-10" : "rounded-50"}
        ${ClickableSize}
        ${className} 
        
        inline-block text-center font-sans text-16`}
    >
      {children}
    </span>
  );
};

export default Clickable;

const getClickableColorValue = (color: ClickableColor) => {
  switch (color) {
    case "black":
      return "bg-black text-white border border-black";
    case "gray":
      return "bg-gray-30 text-white border border-gray-40";
    case "white":
      return "bg-white text-black border border-gray-50";
    case "white-":
      return "bg-white text-gray-40 border border-gray-20";
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

const getClickableSizeValue = (size: ClickableSize) => {
  switch (size) {
    case "large":
      return "max-w-550 w-full font-bold leading-22 py-12";
    case "medium":
      return "max-w-210 w-full font-bold leading-22 py-12";
    case "small":
      return "font-regular leading-24 px-12 py-4";
    default:
      return "";
  }
};
