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
  const { title, stars, nickName, reviewId, tagValues, visitingTime, images } = review;
  const { tagMonth } = calcData(visitingTime);

  return (
    <Link
      href={`/review/${reviewId}`}
      className="shadow-main rounded-10 w-282 h-330 flex flex-col items-center p-8 bg-white select-none"
    >
      <div className="h-240 relative w-full overflow-hidden">
        <Image
          src={images.length !== 0 ? images[0] : NoImg}
          alt="카드 이미지"
          draggable={false}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-10"
        />
      </div>
      <div className="flex flex-col w-full gap-8 px-16 pb-12 mt-8">
        <div className="flex items-center justify-between">
          <h3 className="heading6 w-190 text-ellipsis whitespace-nowrap overflow-hidden">{title}</h3>
          <span className="small-text w-54 text-ellipsis whitespace-nowrap overflow-hidden">by{nickName}</span>
        </div>
        <div className="small-text flex justify-between">
          <div className="flex gap-4">
            <div className="bg-gray-10 w-43 px-2 py-4 text-center rounded-full">{tagMonth}</div>
            {tagValues &&
              Object.entries(tagValues).map(([key, value]: [string, string]) => (
                <ReviewCardTag value={value} key={key + reviewId} />
              ))}
          </div>
          <SingleStarRate rate={stars} />
        </div>
      </div>
    </Link>
  );
}
