import { MultiReviewData } from "@/types/server.types";
import React from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

export default function ReviewList({ data }: { data: MultiReviewData[] }) {
  return (
    <div className="gap-x-24 gap-y-44 mt-13 desktop:grid-cols-4 laptop:grid-cols-3 grid grid-cols-2">
      {data?.map((el, idx) => (
        <ReviewCard key={idx} review={el} />
      ))}
    </div>
  );
}
