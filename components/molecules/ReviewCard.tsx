import { ReviewType } from "@/types/client.types";
import SingleStarRate from "../atoms/SingleStarRate";
import Image from "next/image";

interface Props {
  review: ReviewType;
}

const nullUrl =
  "https://images.unsplash.com/photo-1530469641172-8ac15d0a7d6a?q=80&w=1705&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ReviewCard({ review }: Props) {
  const { imageUrls, rate } = review;
  return (
    <div className="shadow-main rounded-10 flex flex-col w-[17.625rem] h-[20.625rem] p-2 items-center">
      <div className="relative w-full h-[15rem] overflow-hidden">
        <Image
          src={imageUrls ? imageUrls[0] : nullUrl}
          alt="카드 이미지"
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-10"
        />
      </div>
      <div className="w-[15.625rem] flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="heading6">{review.destination}</h3>
          <span className="small-text">by{review.author}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="small-text flex gap-1">
            {review.tag?.map((el) => (
              <div className="bg-gray-10 rounded-full w-[2.6875rem] px-2 py-1 text-center" key={review.reviewId + el}>
                {el}
              </div>
            ))}
          </div>
          <SingleStarRate rate={rate} />
        </div>
      </div>
    </div>
  );
}
