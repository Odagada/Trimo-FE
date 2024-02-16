import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import searchIcon from "@/public/icons/search.svg";
import { useRouter } from "next/router";

const SearchBar = ({ size, className = "" }: { size: "large" | "small"; className?: string }) => {
  const router = useRouter();
  const { searchValue: initialValue } = router.query;

  // 검색 결과가 있을 때 계산된 값을 input에 주입
  const calculatedValue = useCallback(() => {
    if (initialValue) {
      return `"${initialValue}"에 대한 검색 결과입니다`;
    } else {
      return "";
    }
  }, [initialValue])();

  // 제어 컴포넌트를 위한 state
  const [value, setValue] = useState(calculatedValue);

  const handleFocus = () => {
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search/${value}`);
      }}
      className={`
      ${className}
      ${
        size === "large" ? "w-536 border-2 border-black " : "w-460 border border-gray-50"
      } m-auto rounded-100 flex items-center justify-center`}
    >
      <div className={size === "large" ? "w-49 h-49" : "w-33 h-33"}></div>
      <input
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
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
    </form>
  );
};

export default SearchBar;
