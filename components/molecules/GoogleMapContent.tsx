/* eslint-disable no-undef */
import React, { useEffect, useMemo, useRef } from "react";
import { addSingleMarkers } from "@/components/atoms/MapMarker";

const DEFAULT_CENTER = { lat: 37.5519, lng: 126.9918 };
const DEFAULT_ZOOM = 7;

interface MapContentProps {
  locationQuery: string;
}
export const GoogleMapContent = ({ locationQuery }: MapContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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

      const service = new google.maps.places.PlacesService(map);

      // query로 위도, 경도 값 찾기
      service.findPlaceFromQuery(request, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !results) return;

        const locations = [
          {
            lat: results[0].geometry?.location?.lat() as number,
            lng: results[0].geometry?.location?.lng() as number,
          },
        ] as google.maps.LatLngLiteral[];

        addSingleMarkers({ locations, map }); // 지도에 마커 표시
      });
    }
  }, [locationQuery]);

  return <div ref={ref} className="w-[700px] h-[450px]" />; // 구글 지도 컴포넌트
};

export default GoogleMapContent;
