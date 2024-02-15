import { SingleReviewData } from "@/types/server.types";
import SingleStarRate from "../atoms/SingleStarRate";
import Image from "next/image";
import NoImg from "@/public/images/no_image.webp";
import calcData from "@/utils/calcDate";
import ReviewCardTag from "../atoms/ReviewCardTag";

interface Props {
  review: SingleReviewData;
}

export default function ReviewCard({ review }: Props) {
  const { stars, nickName, reviewId, weather, companion, placeType, visitingTime } = review;
  const { tagMonth } = calcData(visitingTime);

  return (
    <div className="shadow-main rounded-10 w-282 h-330 flex flex-col items-center p-8 bg-white">
      <div className="h-240 relative w-full overflow-hidden">
        <Image
          src={NoImg}
          alt="카드 이미지"
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-10"
        />
      </div>
      <div className="w-250 flex flex-col gap-8 mt-8">
        <div className="flex items-center justify-between">
          <h3 className="heading6 w-190 text-ellipsis whitespace-nowrap overflow-hidden">
            제목 들어오는 곳입니다 긴이름
          </h3>
          <span className="small-text w-54 text-ellipsis whitespace-nowrap overflow-hidden">by{nickName}</span>
        </div>
        <div className="small-text flex items-center justify-between">
          <div className="flex gap-4">
            <div className="bg-gray-10 w-43 px-2 py-4 text-center rounded-full">{tagMonth}</div>
            {weather && <ReviewCardTag value={weather} />}
            {companion && <ReviewCardTag value={companion} />}
            {placeType && <ReviewCardTag value={placeType} />}
          </div>
          <SingleStarRate rate={stars} />
        </div>
      </div>
    </div>
  );
}
