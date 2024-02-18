import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { useState } from "react";
import ReviewFrom from "../molecules/ReviewWrite";

export default function PlaceForm() {
  const [spotId, setSpotId] = useState("");
  const [spotError, setSpotError] = useState("");

  return (
    <div className="px-120 pt-96 pb-60 flex flex-col gap-28">
      <GoogleAutoComplete setSpotId={setSpotId} spotError={spotError} setSpotError={setSpotError} />
      <ReviewFrom spotId={spotId} setSpotError={setSpotError} />
    </div>
  );
}
