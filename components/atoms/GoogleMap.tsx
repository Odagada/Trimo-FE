import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

function GoogleMap() {
  const ref = useRef<HTMLDivElement>(null);
  // const [map, setMap] = useState<Map>();

  // useEffect(() => {
  //   if (ref.current && !map) {
  //     setMap(new window.google.maps.Map(ref.current, {}));
  //   }
  // }, [ref, map]);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return <Wrapper apiKey="AIzaSyCXXqxV548C4DL_qcOdDWIIqHvRwnl97rY" render={render}></Wrapper>;
}

export default GoogleMap;
