import React from "react";

interface Props {
  value: string;
}
export default function ReviewCardTag({ value }: Props) {
  return (
    <>
      {value !== "NONE" && (
        <div className="text-10 bg-gray-10 flex-center mobile:small-text mobile:w-43 mobile-py-4 w-32 rounded-full">
          {value}
        </div>
      )}
    </>
  );
}
