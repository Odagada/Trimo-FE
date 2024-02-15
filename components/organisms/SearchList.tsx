import { getReviewList } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../molecules/ReviewCard";

const mockReview = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function SearchList() {
  const { data: reviewListData } = useQuery(getReviewList());
  const reviewList = reviewListData?.data;

  return (
    <div className="px-120 bg-primary gap-x-24 gap-y-44 grid w-full grid-cols-4">
      {reviewList?.length !== 0 ? (
        reviewList?.map((el, idx) => <ReviewCard key={idx} review={el} />)
      ) : (
        <div>검색 결과가 없을 때</div>
      )}
    </div>
  );
}
