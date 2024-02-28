import useDrawGoogleMap from "@/hooks/useDrawGoogleMap";
import { MapProps } from "@/types/client.types";
import React from "react";

export const GoogleMapContent = ({ locationIDList }: MapProps) => {
  // Google Map Reference
  const googleMapRef = useDrawGoogleMap({ locationIDList });

  return <div ref={googleMapRef} className="h-[430px] w-[792px]" />; // 구글 지도 컴포넌트
};

export default GoogleMapContent;
