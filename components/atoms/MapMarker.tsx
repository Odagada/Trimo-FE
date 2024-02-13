/* eslint-disable no-undef */

export const addSingleMarkers = ({
  locationID,
  map,
}: {
  locationID: string;
  map: google.maps.Map | null | undefined;
}) => {
  const service = new google.maps.places.PlacesService(map!);

  // Add Marker on Google Map Component
  service.getDetails({ placeId: locationID }, (result, status) => {
    map?.setCenter(result?.geometry?.location!);
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
};
