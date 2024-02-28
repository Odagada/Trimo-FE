import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { useState } from "react";
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
  const [spotId, setSpotId] = useState(placeId as string);
  const { data: spot } = useQuery(getSpot(placeId as string));
  const formatAddress = spot?.data.formattedAddress;

  return (
    <div className="px-120 pt-96 pb-60 flex flex-col gap-28">
      <GoogleAutoComplete
        setSpotId={setSpotId}
        spotError={spotError}
        setSpotError={setSpotError}
        formatAddress={formatAddress}
      />
      <ReviewEdit spotId={spotId} setSpotError={setSpotError} review={review?.data} />
    </div>
  );
}
