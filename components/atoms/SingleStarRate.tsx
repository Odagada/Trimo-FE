import Star from "@/public/images/icons/star.svg";
import Image from "next/image";

interface Props {
  rate: number;
}

export default function SingleStarRate({ rate = 1 }: Props) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-20 h-20">
        <Image src={Star} alt="별 점" />
      </div>
      {rate}
    </div>
  );
}
