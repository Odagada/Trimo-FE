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
    <div
      className={`flex flex-col gap-12 ${
        align === "left" ? "items-start" : "items-end"
      }`}
    >
      <h3
        className={`${
          align === "left"
            ? "ml-64 tablet:ml-122 laptop:ml-260"
            : "mr-64 tablet:mr-122 laptop:mr-260"
        } leading-16 inline w-fit rounded-100 bg-white px-12 py-6 text-11 font-bold shadow-main laptop:px-15 laptop:py-8 laptop:text-14 laptop:leading-21`}
      >
        {title}
      </h3>
      <div
        ref={containerRef}
        onWheel={handleWheelScroll}
        className={`${
          align === "left" ? "flex-row" : "flex-row-reverse"
        } flex w-full gap-9 overflow-x-auto overscroll-contain pb-10 scrollbar-hide tablet:gap-16 laptop:gap-24`}
      >
        <div className="min-w-55 tablet:min-w-105 laptop:min-w-236"></div>
        {reviewCards.map((review, i) => {
          return <ReviewCard key={i} review={review} />;
        })}
        <div className="min-w-55 tablet:min-w-105 laptop:min-w-236"></div>
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
