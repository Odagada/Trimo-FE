import React from "react";

interface Props {
  size?: "small" | "large";
}

export default function DeleteIcon({ size = "small" }: Props) {
  return (
    <svg
      width={size === "small" ? 20 : 24}
      height={size === "small" ? 20 : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="white" />
      <path d="M7.75781 7.75781L16.2431 16.2431" stroke="#030303" strokeLinejoin="round" />
      <path d="M7.75781 16.2422L16.2431 7.75691" stroke="#030303" strokeLinejoin="round" />
    </svg>
  );
}
