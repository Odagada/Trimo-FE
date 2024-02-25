import { MultiReviewData } from "@/types/server.types";
import React from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

export default function ReviewList({ data }: { data: MultiReviewData[] }) {
  return (
    <div className="gap-x-24 gap-y-44 mt-13 flex flex-wrap w-full">
      {data?.map((el, idx) => (
        <ReviewCard key={idx} review={el} />
      ))}
    </div>
  );
}
