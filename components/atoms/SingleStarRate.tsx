import Star from "@/public/icons/filled_star.svg";
import { Stars } from "@/types/client.types";
import Image from "next/image";

interface Props {
  rate: Stars | undefined;
}

export default function SingleStarRate({ rate = 1 }: Props) {
  return (
    <div className="text-11 text-gray-50 mobile:small-text flex items-center h-20 gap-1">
      <div className="mobile:p-0 relative w-20 h-20 p-2">
        <Image draggable={false} src={Star} alt="별 점" />
      </div>
      {rate}
    </div>
  );
}
