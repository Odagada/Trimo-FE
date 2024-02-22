import { Stars } from "@/types/client.types";
import half_star from "@/public/icons/half_star.svg";
import filled_star from "@/public/icons/filled_star.svg";
import empty_star from "@/public/icons/empty_star.svg";
import Image from "next/image";

const MultiStarRate = ({ number }: { number: Stars }) => {
  if (number === 0) return <></>;

  const filledStars = Math.floor(number);
  const halfStar = number % 1 === 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, i) => (
        <Image draggable={false} key={i} src={filled_star} alt="" width={16} height={16} />
      ))}
      {halfStar && <Image draggable={false} src={half_star} alt="" width={16} height={16} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Image draggable={false} key={i} src={empty_star} alt="" width={16} height={16} />
      ))}
    </div>
  );
};

export default MultiStarRate;
