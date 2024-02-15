import { SingleReviewData } from "@/types/server.types";
import SingleStarRate from "../atoms/SingleStarRate";
import Image from "next/image";
import NoImg from "@/public/images/no_image.webp";
import calcData from "@/utils/calcDate";
import ReviewCardTag from "../atoms/ReviewCardTag";
import Link from "next/link";

interface Props {
  review: SingleReviewData;
}

export default function ReviewCard({ review }: Props) {
  const { stars, nickName, reviewId, tagValues, visitingTime, images } = review;
  const { tagMonth } = calcData(visitingTime);

  return (
    <Link
      href={`/review/${reviewId}`}
      className="shadow-main rounded-10 flex flex-col items-center w-full p-8 bg-white"
    >
      <div className="aspect-266/240 relative w-full overflow-hidden">
        <Image
          src={images ? images[0] : NoImg}
          alt="카드 이미지"
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-10"
        />
      </div>
      <div className="flex flex-col w-full gap-8 mt-8">
        <div className="flex items-center justify-between">
          <h3 className="heading6 w-190 text-ellipsis whitespace-nowrap overflow-hidden">
            제목 들어오는 곳입니다 긴이름
          </h3>
          <span className="small-text w-54 text-ellipsis whitespace-nowrap overflow-hidden">by {nickName}</span>
        </div>
        <div className="small-text flex items-center justify-between">
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
