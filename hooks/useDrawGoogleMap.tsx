/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import { MapContentProps } from "@/components/molecules/GoogleMapContent";
import { addSingleMarkers } from "@/components/atoms/MapMarker";

const DEFAULT_CENTER = { lat: 37.5519, lng: 126.9918 }; // default center 좌표 값 - 대한민국 서울 좌표
const DEFAULT_ZOOM = 13; // zoom default 설정 값
const ZOOM_WITH_NO_PLACE = 4; // zoom value when place info is not given

const useDrawGoogleMap = ({ locationID }: MapContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 화면에 google map 띄우기
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: locationID ? DEFAULT_ZOOM : ZOOM_WITH_NO_PLACE,
      });

      // Add Single Marker On the Google Map with Place ID
      addSingleMarkers({ locationID, map }); // PlaceID로 지도에 마커 표시
    }
  }, [locationID]);

  return ref;
};

export default useDrawGoogleMap;
