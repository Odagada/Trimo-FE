import StarFull from "@/public/icons/star-regular.svg";
import StarEmpty from "@/public/icons/star-solid.svg";
import Image from "next/image";
import { KeyboardEvent } from "react";

interface Props {
  isChecked: boolean;
  rate: number;
  // eslint-disable-next-line no-unused-vars
  onClick: (num: number) => void;
  // eslint-disable-next-line no-unused-vars
  onMouseOver: (num: number) => void;
  // eslint-disable-next-line no-unused-vars
  onMouseOut: () => void;
}

export default function Star({ isChecked, onClick, rate, onMouseOver, onMouseOut }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onClick(rate);
    }
  };

  return (
    <button
      className="w-5 h-10 overflow-hidden"
      onMouseOver={() => {
        onMouseOver(rate);
      }}
      onKeyDown={handleKeyDown}
      onMouseOut={onMouseOut}
      onClick={() => {
        onClick(rate);
      }}
    >
      {isChecked ? <Image src={StarFull} alt="채워진 별" /> : <Image src={StarEmpty} alt="빈 별" />}
    </button>
  );
}
