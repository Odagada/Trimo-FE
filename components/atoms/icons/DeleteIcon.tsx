import React from "react";

interface Props {
  size?: "small" | "large";
}

const sizes = {
  small: "p-5 w-17 h-17",
  large: "p-7 w-24 h-24",
};

export default function DeleteIcon({ size = "small" }: Props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={sizes[size]}
    >
      <g id="error sign">
        <path id="Vector 153" d="M0.757812 0.757812L9.24309 9.24309" stroke="#030303" strokeLinejoin="round" />
        <path id="Vector 153_2" d="M0.757812 9.24219L9.24309 0.756906" stroke="#030303" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
