import { getSearchReview } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReviewList from "../molecules/ReviewList";
import NoResult from "@/components/molecules/NoResult";
import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";

export default function SearchContent({ queryStr }: { queryStr: string }) {
  const [searchQuery, setSearchQuery] = useState(queryStr);
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

  if (reviewList === undefined) {
    return <></>;
  }
  return (
    <>
      {reviewList?.length !== 0 ? (
        <div className="border-gray-30 mt-42 laptop:mx-120 tablet:mx-60 min-h-600 pt-8 pb-12 mx-20 border-t">
          <OrderDropdown />
          <div className="flex-center flex">
            <ReviewList data={reviewList} />
          </div>
        </div>
      ) : (
        <NoResult />
      )}
    </>
  );
}
