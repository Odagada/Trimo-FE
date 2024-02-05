import useDrawGoogleMap from "@/hooks/useDrawGoogleMap";
import React from "react";

export interface MapContentProps {
  locationQuery: string;
}

export const GoogleMapContent = ({ locationQuery }: MapContentProps) => {
  const ref = useDrawGoogleMap({ locationQuery });

  return <div ref={ref} className="w-[700px] h-[450px]" />; // 구글 지도 컴포넌트
};

export default GoogleMapContent;
