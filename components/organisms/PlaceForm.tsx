import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { useState } from "react";
import ReviewFrom from "../molecules/ReviewWrite";

export default function PlaceForm() {
  const [spotId, setSpotId] = useState("");
  const [spotError, setSpotError] = useState("");

  return (
    <div className="flex flex-col gap-28 tablet:px-120 tablet:pb-60 tablet:pt-96 px-20 pt-48 pb-26">
      <GoogleAutoComplete setSpotId={setSpotId} spotError={spotError} setSpotError={setSpotError} />
      <ReviewFrom spotId={spotId} setSpotError={setSpotError} />
    </div>
  );
}
