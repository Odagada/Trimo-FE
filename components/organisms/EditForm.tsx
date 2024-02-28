import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getReview, getSpot } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";
import ReviewEdit from "../molecules/ReviewEdit";

export default function EditForm() {
  const [spotError, setSpotError] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { data: review } = useQuery(getReview(Number(id)));
  const placeId = review?.data.placeId;
  const [spotId, setSpotId] = useState("");
  const { data: spot } = useQuery(getSpot(placeId as string));
  const formatAddress = spot?.data.formattedAddress;

  useEffect(() => {
    setSpotId(placeId as string);
  }, [placeId]);

  return (
    <div className="flex flex-col gap-28 px-20 pb-26 pt-48 tablet:px-120 tablet:pb-60 tablet:pt-96">
      <GoogleAutoComplete
        setSpotId={setSpotId}
        spotError={spotError}
        setSpotError={setSpotError}
        formatAddress={formatAddress}
      />
      <ReviewEdit spotId={spotId} setSpotError={setSpotError} review={review?.data} reviewId={Number(id)} />
    </div>
  );
}
