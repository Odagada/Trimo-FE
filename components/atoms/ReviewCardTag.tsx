import React from "react";

interface Props {
  value: string;
}
export default function ReviewCardTag({ value }: Props) {
  return (
    <>
      {value !== "NONE" && (
        <div className="flex-center tablet:small-text tablet-py-4 w-32 rounded-full bg-gray-10 text-10 tablet:w-43">
          {value}
        </div>
      )}
    </>
  );
}
