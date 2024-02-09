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
    <div className="shadow-main rounded-10 w-282 h-330 flex flex-col items-center p-8">
      <div className="h-240 relative w-full overflow-hidden">
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
      <div className="w-250 flex flex-col gap-8 mt-8">
        <div className="flex items-center justify-between">
          <h3 className="heading6 max-w-190">{review.destination}</h3>
          <span className="small-text">by{review.author}</span>
        </div>
        <div className="small-text flex items-center justify-between">
          <div className="flex gap-4">
            {review.tag?.map((el) => (
              <div className="bg-gray-10 w-43 px-2 py-4 text-center rounded-full" key={review.reviewId + el}>
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
