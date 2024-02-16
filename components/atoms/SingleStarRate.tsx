import Star from "@/public/icons/filled_star.svg";
import { Stars } from "@/types/client.types";
import Image from "next/image";

interface Props {
  rate: Stars | undefined;
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
