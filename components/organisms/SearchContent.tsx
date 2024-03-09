import { getSearchReview } from "@/apis/capsulesQuery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReviewList from "../molecules/ReviewList";
import NoResult from "@/components/molecules/NoResult";
import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";
import fetcher from "@/apis/axios";
import { MultiReviewData, searchReview } from "@/types/server.types";
import useInterSectionObserver from "@/hooks/useIntersectionObserver";

const getSearchReviews = async (query: string, pageParam: number) => {
  const data = await fetcher<searchReview>({
    method: "get",
    url: `main/reviews/specifics?${query}&page=${pageParam}`,
  });
  return data.data;
};

const combineArray = (arr: searchReview[]) => {
  return arr?.reduce((acc: MultiReviewData[], cur) => [...acc, ...cur.reviewList], [] as MultiReviewData[]);
};

export default function SearchContent() {
  const router = useRouter();
  const { query } = router;
  const target = useRef(null);
  const convertQuery = new URLSearchParams(query as any).toString();
  const [show, setShow] = useState(true);

  const {
    data: reviewData,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["reviewList", convertQuery],
    queryFn: ({ pageParam }) => getSearchReviews(convertQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.totalCount > lastPageParam * 24 ? lastPageParam + 1 : undefined,
  });

  const onIntersect = () => {
    if (!hasNextPage) {
      setShow(false);
    }
    if (!isLoading) {
      fetchNextPage();
    }
  };

  useInterSectionObserver({ target, onIntersect, deps: [isLoading, hasNextPage, query] });

  useEffect(() => {
    setShow(true);
    refetch();
  }, [query]);

  return (
    <div className={`${reviewData === undefined && isLoading ? "mt-[100vh]" : ""}`}>
      {isLoading ? (
        <div>로딩중</div>
      ) : reviewData?.pages[0] ? (
        <div className="mx-20 mb-30 mt-42 min-h-600 border-t border-gray-30 pb-12 pt-8 tablet:mx-60 tablet:mb-136 laptop:mx-120">
          <OrderDropdown />
          <div className="flex-center flex">
            <ReviewList data={combineArray(reviewData.pages)} />
          </div>
        </div>
      ) : (
        <NoResult keyword={query.searchValue as string} />
      )}
      <div className={`${!show && "hidden"} h-40`} ref={target}></div>
    </div>
  );
}
