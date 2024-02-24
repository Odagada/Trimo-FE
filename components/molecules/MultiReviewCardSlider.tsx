import { MultiReviewData } from "@/types/server.types";
import ReviewCard from "./ReviewCard";
import { WheelEvent, useRef } from "react";

const MultiReviewCardSlider = ({
  title,
  align,
  reviewCards,
}: {
  title: string;
  reviewCards: MultiReviewData[];
  align: "left" | "right";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheelScroll = (event: WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    }
  };

  return (
    <div className={`flex flex-col gap-12 ${align === "left" ? "items-start" : "items-end"}`}>
      <h3
        className={`${
          align === "left" ? "ml-260" : "mr-260"
        } bg-white inline px-15 py-8 rounded-100 shadow-main w-fit text-18 font-bold leading-27`}
      >
        {title}
      </h3>
      <div
        ref={containerRef}
        onWheel={handleWheelScroll}
        className={`${
          align === "left" ? "flex-row" : "flex-row-reverse"
        } w-full flex gap-20 px-260 overflow-x-auto overscroll-contain scrollbar-hide pb-10`}
      >
        {reviewCards.map((review, i) => {
          return <ReviewCard key={i} review={review} />;
        })}
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
