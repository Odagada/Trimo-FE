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
          align === "left" ? "tablet:ml-260 ml-64" : "tablet:mr-260 mr-64"
        } bg-white inline tablet:px-15 tablet:py-8 px-8 py-3 tablet:text-18 tablet:leading-27 leading-16 text-11 rounded-100 shadow-main w-fit font-bold`}
      >
        {title}
      </h3>
      <div
        ref={containerRef}
        onWheel={handleWheelScroll}
        className={`${
          align === "left" ? "flex-row" : "flex-row-reverse"
        } w-full flex tablet:gap-20 gap-9 overflow-x-auto overscroll-contain scrollbar-hide pb-10`}
      >
        <div className="tablet:min-w-240 min-w-55"></div>
        {reviewCards.map((review, i) => {
          return <ReviewCard key={i} review={review} />;
        })}
        <div className="tablet:min-w-240 min-w-55"></div>
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
