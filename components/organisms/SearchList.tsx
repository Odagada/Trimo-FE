import { getReviewList } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../molecules/ReviewCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchList() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { query } = router;
  const { data: reviewListData } = useQuery(getReviewList(searchQuery));
  const reviewList = reviewListData?.data;

  useEffect(() => {
    //검색 api 실행
    const convertQuery = new URLSearchParams(query as any).toString();
    setSearchQuery(convertQuery);
  }, [query]);

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
