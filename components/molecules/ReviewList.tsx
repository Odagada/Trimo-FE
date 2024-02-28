import { MultiReviewData } from "@/types/server.types";
import React from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

export default function ReviewList({ data }: { data: MultiReviewData[] }) {
  return (
    <div className="mt-13 flex w-full flex-wrap gap-x-24 gap-y-44">
      {data?.map((el, idx) => <ReviewCard key={idx} review={el} />)}
    </div>
  );
}
