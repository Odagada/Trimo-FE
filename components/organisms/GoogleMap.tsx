import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "@/components/atoms/Spinner";
import GoogleMapContent from "@/components/molecules/GoogleMapContent";
import { MapProps } from "@/types/client.types";

function GoogleMap({ locationIDList }: MapProps) {
  const apiKey = "AIzaSyCXXqxV548C4DL_qcOdDWIIqHvRwnl97rY";

  if (!apiKey) {
    return <div>Google Maps api key가 없어 지도를 띄울 수 없습니다! 관리자에게 문의하세요</div>; // 이 부분은 나중에 따로 에러시 어떻게 회면에 띄울지 정해도 좋을 것 같습니다.
  }

  const render = () => {
    if (Status.LOADING) return <Spinner />;
    else return <></>;
  };

  return (
    <Wrapper apiKey={apiKey} libraries={["places"]} render={render}>
      <GoogleMapContent locationIDList={locationIDList || [""]} />
    </Wrapper>
  );
}

export default GoogleMap;
