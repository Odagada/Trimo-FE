import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { useState } from "react";
import ReviewWrite from "../molecules/ReviewWrite";

export default function WriteForm() {
  const [spotId, setSpotId] = useState("");

  return (
    <div className="flex flex-col gap-28 px-20 pb-26 pt-48 tablet:px-120 tablet:pb-60 tablet:pt-96">
      <GoogleAutoComplete setSpotId={setSpotId} />
      <ReviewWrite spotId={spotId} />
    </div>
  );
}
