import { MultiReviewData } from "@/types/server.types";
import React from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

export default function ReviewList({ data }: { data: MultiReviewData[] }) {
  return (
    <div className="mt-13 grid grid-cols-2 gap-x-24 gap-y-44 desktop:grid-cols-4 laptop:grid-cols-3">
      {data?.map((el, idx) => (
        <ReviewCard key={idx} review={el} />
      ))}
    </div>
  );
}
