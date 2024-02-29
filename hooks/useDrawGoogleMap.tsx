/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import { addSingleMarkers } from "@/components/atoms/MapMarker";
import { MapProps } from "@/types/client.types";

const DEFAULT_CENTER = { lat: 37.5519, lng: 126.9918 }; // default center 좌표 값 - 대한민국 서울 좌표
const SINGLE_MARKER_ZOOM = 15; // zoom 설정 값
const MULTIPLE_MARKER_ZOOM = 4;

const useDrawGoogleMap = ({ locationIDList }: MapProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 화면에 google map 띄우기
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: locationIDList.length > 1 ? MULTIPLE_MARKER_ZOOM : SINGLE_MARKER_ZOOM,
      });

      // Add Single Marker On the Google Map with Place ID
      addSingleMarkers({ locationIDList, map }); // PlaceID로 지도에 마커 표시
    }
  }, [locationIDList]);

  return ref;
};

export default useDrawGoogleMap;
