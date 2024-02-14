import Image from "next/image";
import { useCallback, useState } from "react";
import searchIcon from "@/public/icons/search.svg";

const SearchBar = ({
  initialValue = "",
  size,
  className = "",
}: {
  initialValue?: string;
  size: "large" | "small";
  className?: string;
}) => {
  const calculatedValue = useCallback(() => {
    if (initialValue) {
      return `"${initialValue}"에 대한 검색 결과입니다`;
    } else {
      return "";
    }
  }, [initialValue])();

  const [value, setValue] = useState(calculatedValue);

  return (
    <div
      className={`
      ${className}
      ${
        size === "large" ? "w-536 border-2 border-black " : "w-460 border border-gray-50"
      } m-auto   rounded-100 flex items-center justify-center`}
    >
      <div className={size === "large" ? "w-49 h-49" : "w-33 h-33"}></div>
      <input
        value={value}
        onFocus={() => {
          setValue("");
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="리뷰가 궁금한 여행지를 검색해보세요!"
        className="flex-1 text-center text-16 leading-24 font-regular focus:outline-none"
      />
      <button
        className={`${
          size === "large" ? "w-49 h-49" : "w-33 h-33"
        } bg-black rounded-100 m-6 flex items-center justify-center`}
      >
        <Image
          src={searchIcon}
          width={`${size === "large" ? 19 : 13}`}
          height={`${size === "large" ? 19 : 13}`}
          alt=""
        />
      </button>
    </div>
  );
};

export default SearchBar;
