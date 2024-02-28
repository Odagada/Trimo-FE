import { useState } from "react";
import FilterOptionsButtons from "../atoms/FilterOptionButtons";
import ReviewCard from "../molecules/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { getFilteredMyPlaces } from "@/apis/capsulesQuery";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";

function MyReviewGridLayout({ placeIds }: { placeIds: string[] }) {
  const [query, setQuery] = useState<string>("");

  const { userAccessToken } = useManageUserAccessToken();
  const { data: myReviews } = useQuery(getFilteredMyPlaces(userAccessToken, query));

  const setQueryStr = (query: string) => setQuery(query);

  return (
    <section className="flex flex-col scrollbar-hide">
      <FilterOptionsButtons placeId={placeIds} setQuery={setQueryStr} />
      <div className="grid w-fit grid-cols-3 grid-rows-2 gap-10 scrollbar-hide maxDesktop:grid-cols-2">
        {typeof myReviews?.data === "undefined" || myReviews?.data.length > 0 ? (
          myReviews?.data.map((review, index) => <ReviewCard review={review} key={index}></ReviewCard>)
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default MyReviewGridLayout;
