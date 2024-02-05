import Star from "@/public/icons/favorite 1.svg";
import Image from "next/image";

interface Props {
  rate: number;
}

export default function SingleStarRate({ rate = 1 }: Props) {
  return (
    <div>
      <Image src={Star} alt="별 점" />
      {rate}
    </div>
  );
}
