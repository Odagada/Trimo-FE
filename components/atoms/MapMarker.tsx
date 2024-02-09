/* eslint-disable no-undef */

// 구글 지도에 마커 컴포넌트 표시하기
export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) =>
  locations?.map(
    (position) =>
      new google.maps.Marker({
        position,
        map,
      })
  );
