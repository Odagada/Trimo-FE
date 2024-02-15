import { MultiReviewData } from "@/types/server.types";
import ReviewCard from "./ReviewCard";

const MultiReviewCardSlider = ({
  title,
  margin,
  reviewCards,
}: {
  title: string;
  reviewCards: MultiReviewData[];
  margin: "left" | "right";
}) => {
  return (
    <div className="flex flex-col gap-12">
      <h3 className={`${margin === "left" ? "ml-260 text-left" : "mr-260 text-right"}  text-18 font-bold leading-27`}>
        {title}
      </h3>
      <div
        className={`${
          margin === "left" ? "flex-row" : "flex-row-reverse"
        } w-full flex gap-20 overflow-x-auto scrollbar-hide pb-10`}
      >
        <div className="w-240 grow-0 shrink-0">
          <br />
        </div>
        {reviewCards.map((review, i) => {
          return <ReviewCard key={i} review={review} />;
        })}
      </div>
    </div>
  );
};

export default MultiReviewCardSlider;
