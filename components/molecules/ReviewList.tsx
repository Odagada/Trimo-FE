import { MultiReviewData } from "@/types/server.types";
import React from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

export default function ReviewList({ data }: { data: MultiReviewData[] }) {
  return (
    <div className="gap-x-24 gap-y-44 laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2 mt-13 grid w-full">
      {data?.map((el, idx) => (
        <ReviewCard key={idx} review={el} />
      ))}
    </div>
  );
}
