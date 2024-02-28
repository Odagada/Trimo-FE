import StarFull from "@/public/icons/filled_star.svg";
import StarEmpty from "@/public/icons/empty_star.svg";
import halfStarImg from "@/public/icons/half_star.svg";
import Image from "next/image";
import { KeyboardEvent } from "react";
import { Stars } from "@/types/client.types";

interface Props {
  isChecked: boolean;
  rate: Stars;
  onClick: (num: Stars) => void;
  onMouseOver: (num: number) => void;
  onMouseOut: () => void;
  halfStar: boolean;
}

export default function Star({
  isChecked,
  onClick,
  rate,
  onMouseOver,
  onMouseOut,
  halfStar,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onClick(rate);
    }
  };

  return (
    <>
      <button
        className={`${
          halfStar ? "relative z-10 overflow-hidden" : "translate-x-[-1.4rem]"
        } h-28 w-14`}
        onMouseOver={() => {
          onMouseOver(rate);
        }}
        onKeyDown={handleKeyDown}
        onMouseOut={onMouseOut}
        onClick={() => {
          onClick(rate);
        }}
        type="button"
      >
        {isChecked ? (
          <Image
            draggable={false}
            src={StarEmpty}
            alt="빈 별"
            style={{ maxWidth: "100vw" }}
          />
        ) : halfStar ? (
          <Image
            draggable={false}
            src={halfStarImg}
            alt="반 별"
            style={{ maxWidth: "100vw" }}
          />
        ) : (
          <Image
            draggable={false}
            src={StarFull}
            alt="채워진 별"
            style={{ maxWidth: "100vw" }}
          />
        )}
      </button>
    </>
  );
}
