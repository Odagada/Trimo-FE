import { MultiReviewData } from "@/types/server.types";
import SingleStarRate from "../atoms/SingleStarRate";
import Image from "next/image";
import NoImg from "@/public/images/no_image.webp";
import calcData from "@/utils/calcDate";
import ReviewCardTag from "../atoms/ReviewCardTag";
import Link from "next/link";
interface Props {
  review: MultiReviewData;
}

export default function ReviewCard({ review }: Props) {
  const { title, stars, nickName, reviewId, tagValues, image, visitingTime } = review;
  const { tagMonth } = calcData(visitingTime);

  return (
    <Link
      href={`/review/${reviewId}`}
      className="flex h-205 w-155 shrink-0 select-none flex-col items-center rounded-10 bg-white p-4 shadow-main tablet:h-330 tablet:w-282 tablet:p-8"
    >
      <div className="relative h-240 w-full overflow-hidden">
        <Image
          src={image ?? NoImg}
          alt="카드 이미지"
          draggable={false}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-10"
        />
      </div>
      <div className="grid w-full grid-cols-[auto_3.7rem] grid-rows-[2rem_2rem_2rem] items-center p-4 pb-6 tablet:grid-cols-[auto_4.8rem] tablet:grid-rows-[2.8rem_2.6rem] tablet:gap-x-14 tablet:gap-y-8">
        <h3 className="tablet:heading6 col-span-2 truncate text-14 font-bold leading-20 tablet:col-span-1">{title}</h3>
        <div className="tablet:small-text truncate text-10 leading-20">
          <span>by {nickName}</span>
        </div>
        <div className="col-span-2 flex gap-4 tablet:col-span-1">
          <div className="flex-center tablet:small-text w-32 rounded-full bg-gray-10 text-10 tablet:w-43 tablet:py-4">
            {tagMonth}
          </div>
          {tagValues &&
            Object.entries(tagValues).map(([key, value]: [string, string]) => (
              <ReviewCardTag value={value} key={key + reviewId} />
            ))}
        </div>
        {stars !== 0 && (
          <div className="col-start-2 row-start-2 flex justify-end">
            <SingleStarRate rate={stars} />
          </div>
        )}
      </div>
    </Link>
  );
}
