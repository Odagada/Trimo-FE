import { getSearchReview } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReviewList from "../molecules/ReviewList";
import NoResult from "@/components/molecules/NoResult";
import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";

export default function SearchContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { query } = router;

  const { data: reviewListData } = useQuery(getSearchReview(searchQuery));
  const reviewList = reviewListData?.data;

  useEffect(() => {
    //검색 api 실행
    const convertQuery = new URLSearchParams(query as any).toString();
    if (query?.order !== undefined) {
      setSearchQuery(convertQuery);
    }
  }, [query]);

  if (query.order === undefined) {
    return <></>;
  }
  return (
    <>
      {reviewList?.length !== 0 && reviewList !== undefined ? (
        <div className="border-gray-30 mt-42 laptop:mx-120 pt-8 pb-12 border-t mx-20 tablet:mx-60">
          <OrderDropdown />
          <ReviewList data={reviewList} />
        </div>
      ) : (
        <NoResult />
      )}
    </>
  );
}
