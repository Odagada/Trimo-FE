import { ButtonColor, ButtonShape, ButtonSize } from "@/types/client.types";
import { getButtonColorValue, getButtonSizeValue } from "@/utils/getButton";
import { ReactNode } from "react";

const Button = ({
  children,
  className = "",
  color = "black",
  shape = "square",
  size = "large",
}: {
  children: ReactNode;
  className?: string;
  color?: ButtonColor;
  shape?: ButtonShape;
  size?: ButtonSize;
}) => {
  const ButtonColor = getButtonColorValue(color);
  const ButtonSize = getButtonSizeValue(size);

  return (
    <span
      className={`${className}
        ${ButtonColor}
        ${shape === "square" ? "rounded-10" : "rounded-50"}
        ${ButtonSize}
        
        font-sans inline-block text-center`}
    >
      {children}
    </span>
  );
};

export default Button;
