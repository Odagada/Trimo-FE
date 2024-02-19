import { MultiReviewData } from "@/types/server.types";
import ReviewCard from "./ReviewCard";

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
          align === "left" ? "ml-260" : "mr-260"
        } bg-white inline px-15 py-8 rounded-100 shadow-main w-fit text-18 font-bold leading-27`}
      >
        {title}
      </h3>
      <div
        className={`${
          align === "left" ? "flex-row" : "flex-row-reverse"
        } w-full flex gap-20 px-260 overflow-x-auto scrollbar-hide pb-10`}
      >
        {reviewCards.map((review, i) => {
          return <ReviewCard key={i} review={review} />;
        })}
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
