/* eslint-disable no-undef */
import { addSingleMarkers } from "@/components/atoms/MapMarker";

interface Props {
  map: google.maps.Map;
  request: {
    query: string;
    fields: string[];
  };
}

const markPlaceByQuery = ({ map, request }: Props) => {
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

    // Add Single Marker On the Google Map
    addSingleMarkers({ locations, map }); // 지도에 마커 표시
  });
};
export default markPlaceByQuery;
