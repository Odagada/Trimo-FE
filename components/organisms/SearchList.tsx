import { getReviewList } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../molecules/ReviewCard";

export default function SearchList() {
  const { data: reviewListData } = useQuery(getReviewList());
  const reviewList = reviewListData?.data;

  return (
    <div className="gap-x-24 gap-y-44 laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2 mt-13 grid w-full">
      {reviewList?.length !== 0 ? (
        reviewList?.map((el, idx) => <ReviewCard key={idx} review={el} />)
      ) : (
        <div>검색 결과가 없을 때</div>
      )}
    </div>
  );
}
