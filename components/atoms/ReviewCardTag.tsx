import React from "react";

interface Props {
  value: string;
}
export default function ReviewCardTag({ value }: Props) {
  return <>{value !== "NONE" && <div className="bg-gray-10 w-43 px-2 py-4 text-center rounded-full">{value}</div>}</>;
}
