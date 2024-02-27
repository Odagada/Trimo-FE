import React from "react";

interface Props {
  value: string;
}
export default function ReviewCardTag({ value }: Props) {
  return (
    <>
      {value !== "NONE" && (
        <div className="text-10 bg-gray-10 flex-center tablet:small-text tablet:w-43 tablet-py-4 w-32 rounded-full">
          {value}
        </div>
      )}
    </>
  );
}
