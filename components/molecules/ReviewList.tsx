import { MultiReviewData } from "@/types/server.types";
import React from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

interface Props {
  data: MultiReviewData[];
}

export default function ReviewList({ data }: Props) {
  return (
    <div className="mt-13 grid grid-cols-2 gap-x-24 gap-y-44 laptop:grid-cols-3 desktop:grid-cols-4">
      {data?.map((el, idx) => <ReviewCard key={idx} review={el} />)}
    </div>
  );
}
