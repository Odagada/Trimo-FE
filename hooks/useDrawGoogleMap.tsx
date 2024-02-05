/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import { MapContentProps } from "@/components/molecules/GoogleMapContent";
import markPlaceByQuery from "@/utils/markPlaceByQuery";

const DEFAULT_CENTER = { lat: 37.5519, lng: 126.9918 }; // default center 좌표 값 - 대한민국 서울 좌표
const DEFAULT_ZOOM = 7; // zoom 설정 값

const useDrawGoogleMap = ({ locationQuery }: MapContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 검색 할 request 내용 작성하기
    const request = {
      query: locationQuery,
      fields: ["name", "geometry"],
    };

    // 화면에 google map 띄우기
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });

      // query로 위도, 경도 값 찾고 mark 하기
      markPlaceByQuery({ map, request }) as unknown as google.maps.LatLngLiteral[];
    }
  }, [locationQuery]);

  return ref;
};

export default useDrawGoogleMap;
