import Star from "@/public/icons/filled_star.svg";
import { Stars } from "@/types/client.types";
import Image from "next/image";

interface Props {
  rate: Stars | undefined;
}

export default function SingleStarRate({ rate = 1 }: Props) {
  return (
    <div className="mobile:small-text flex h-20 items-center gap-1 text-11 text-gray-50">
      <div className="relative h-20 w-20 p-2 mobile:p-0">
        <Image draggable={false} src={Star} alt="별 점" />
      </div>
      {rate}
    </div>
  );
}
