import StarFull from "@/public/images/icons/star.svg";
import StarEmpty from "@/public/images/icons/none.svg";
import Image from "next/image";
import { KeyboardEvent, ReactNode } from "react";

interface Props {
  isChecked: boolean;
  rate: number;
  onClick: (num: number) => void;
  onMouseOver: (num: number) => void;
  onMouseOut: () => void;
}

export default function Star({ isChecked, onClick, rate, onMouseOver, onMouseOut }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onClick(rate);
    }
  };

  return (
    <>
      <button
        className="w-28 h-28"
        onMouseOver={() => {
          onMouseOver(rate);
        }}
        onKeyDown={handleKeyDown}
        onMouseOut={onMouseOut}
        onClick={() => {
          onClick(rate);
        }}
      >
        {isChecked ? <Image src={StarEmpty} alt="빈 별" /> : <Image src={StarFull} alt="채워진 별" />}
      </button>
    </>
  );
}
