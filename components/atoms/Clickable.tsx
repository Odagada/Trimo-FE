import { ClickableColor, ClickableShape, ClickableSize } from "@/types/client.types";
import { getClickableColorValue, getClickableSizeValue } from "@/utils/getClickableStyle";
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
      className={`${className}
        ${ClickableColor}
        ${shape === "square" ? "rounded-10" : "rounded-50"}
        ${ClickableSize}
        
        font-sans inline-block text-center`}
    >
      {children}
    </span>
  );
};

export default Clickable;
