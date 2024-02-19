/* eslint-disable no-undef */
export const addSingleMarkers = ({
  locationIDList,
  map,
}: {
  locationIDList: string[];
  map: google.maps.Map | null | undefined;
}) => {
  const service = new google.maps.places.PlacesService(map!);

  // Add Marker on Google Map Component
  locationIDList.map((location, index) => {
    service.getDetails({ placeId: location }, (result, status) => {
      index === 0 && map?.setCenter(result?.geometry?.location!);
      const marker = new google.maps.Marker({
        map,
        draggable: true,
        clickable: true,
        position: result?.geometry?.location,
      });

      // Evoke Zoom Effect when Marker Clicked
      google.maps.event.addListener(marker, "click", () => {
        map?.setZoom(18);
        map?.setCenter(marker.getPosition()!);
      });
    });
  });
};
