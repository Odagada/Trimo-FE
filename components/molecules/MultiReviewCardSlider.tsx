import { MultiReviewData } from "@/types/server.types";
import ReviewCard from "./ReviewCard";
import { WheelEvent, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const MultiReviewCardSlider = ({
  title,
  align,
  reviewCards,
}: {
  title: string;
  reviewCards: MultiReviewData[];
  align: "left" | "right";
}) => {
  return (
    <div className={`flex flex-col gap-12 ${align === "left" ? "items-start" : "items-end"}`}>
      <h3
        className={`${
          align === "left" ? "ml-64 tablet:ml-122 laptop:ml-260" : "mr-64 tablet:mr-122 laptop:mr-260"
        } leading-16 inline w-fit rounded-100 bg-white px-12 py-6 text-11 font-bold shadow-main laptop:px-15 laptop:py-8 laptop:text-14 laptop:leading-21`}
      >
        {title}
      </h3>

      <div
        className={`${
          align === "left" ? "flex-row" : "flex-row-reverse"
        } flex w-full gap-9 pb-10 scrollbar-hide tablet:gap-16 laptop:gap-24`}
      >
        <ScrollContainer
          className={`${
            align === "left" ? "flex-row" : "flex-row-reverse"
          } scroll-container flex w-full gap-9 pb-10 scrollbar-hide tablet:gap-16 laptop:gap-24`}
        >
          <div className="min-w-55 tablet:min-w-105 laptop:min-w-236"></div>
          {reviewCards.map((review, i) => {
            return <ReviewCard key={i} review={review} />;
          })}
          <div className="min-w-55 tablet:min-w-105 laptop:min-w-236"></div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
