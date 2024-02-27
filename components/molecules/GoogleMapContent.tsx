import useDrawGoogleMap from "@/hooks/useDrawGoogleMap";
import { MapProps } from "@/types/client.types";
import React from "react";
import { GoogleMapProps } from "../organisms/GoogleMap";

export const GoogleMapContent = ({ locationIDList, size }: GoogleMapProps) => {
  // Google Map Reference
  const googleMapRef = useDrawGoogleMap({ locationIDList });

  return <div ref={googleMapRef} className={`${size || "w-792 h-430"} rounded-[9px]`} />; // 구글 지도 컴포넌트
};

export default GoogleMapContent;
