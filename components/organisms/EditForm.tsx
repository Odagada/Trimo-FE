import GoogleAutoComplete from "../molecules/GoogleAutoComplete";

import { useState } from "react";
import ReviewFrom from "../molecules/ReviewWrite";
import { useRouter } from "next/router";
import { getReview, getSpot } from "@/apis/capsulesQuery";
import { useQuery } from "@tanstack/react-query";

export default function EditForm() {
  const [spotError, setSpotError] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { data: review } = useQuery(getReview(Number(id)));
  const placeId = review?.data.placeId;
  const [spotId, setSpotId] = useState(placeId as string);
  // const [spotId, setSpotId] = useState("");
  const { data: spot } = useQuery(getSpot(placeId as string));
  const formatAddress = spot?.data.formattedAddress;
  // const formatAddress = "테스트";
  // const review = {
  //   data: {
  //     reviewId: 2,
  //     title: "하이",
  //     content: "디스크립션",
  //     tagValues: {
  //       weather: "눈",
  //       placeType: "맛집",
  //       companion: "연인",
  //     },
  //     nickName: "수락",
  //     spotName: "오사카",
  //     placeId: "플레이스아이디",
  //     createdAt: "202202020202",
  //     modifiedAt: "202402260303",
  //     visitingTime: "202403030202",
  //     images: ["https://www.dogdrip.net/dvs/d/24/02/26/a7d04bab8939434c8c9ccdd5b72e7285.jpg", ""],
  //     stars: 5,
  //   },
  //   state: 200,
  // };

  return (
    <div className="px-120 pt-96 pb-60 flex flex-col gap-28">
      <GoogleAutoComplete
        setSpotId={setSpotId}
        spotError={spotError}
        setSpotError={setSpotError}
        formatAddress={formatAddress}
      />
      <ReviewFrom spotId={spotId} setSpotError={setSpotError} review={review?.data} />
    </div>
  );
}
