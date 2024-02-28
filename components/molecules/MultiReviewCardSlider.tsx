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
          align === "left" ? "ml-64 tablet:ml-260" : "mr-64 tablet:mr-260"
        } leading-16 inline w-fit rounded-100 bg-white px-8 py-3 text-11 font-bold shadow-main tablet:px-15 tablet:py-8 tablet:text-18 tablet:leading-27`}
      >
        {title}
      </h3>
      <div
        ref={containerRef}
        onWheel={handleWheelScroll}
        className={`${
          align === "left" ? "flex-row" : "flex-row-reverse"
        } flex w-full gap-9 overflow-x-auto overscroll-contain pb-10 scrollbar-hide tablet:gap-20`}
      >
        <div className="min-w-55 tablet:min-w-240"></div>
        {reviewCards.map((review, i) => {
          return <ReviewCard key={i} review={review} />;
        })}
        <div className="min-w-55 tablet:min-w-240"></div>
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
