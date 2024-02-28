import { getReviewCardArray } from "@/apis/capsulesQuery";
import ReviewList from "@/components/molecules/ReviewList";
import { useQuery } from "@tanstack/react-query";

export default function NoResult() {
  const { data: reviewData } = useQuery(getReviewCardArray("POPULAR"));
  const reviewList = reviewData?.data;
  return (
    <div>
      <div className="mt-36 mb-109 text-gray-40 tablet:p-text text-center">
        <div>(키워드) 에 대한 검색결과가 없습니다.</div>
        <div>다른 키워드로 다시 검색해보세요.</div>
      </div>
      <div className="tablet:px-120 bg-gray-10 pb-28 px-20 pt-24">
        <div className="tablet:heading6 heading7">이런 리뷰는 어떠세요?</div>
        <div className="small-text text-gray-40 mt-4">다른 유저들이 관심을 갖고 있는 리뷰에요.</div>
        {reviewList && (
          <div className="flex">
            <ReviewList data={reviewList} />
          </div>
        )}
      </div>
    </div>
  );
}
