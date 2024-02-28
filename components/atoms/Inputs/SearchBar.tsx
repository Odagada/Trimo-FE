import Image from "next/image";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import searchIcon from "@/public/icons/search.svg";
import { useRouter } from "next/router";

const SearchBar = ({ size, className = "" }: { size: "large" | "small"; className?: string }) => {
  const router = useRouter();
  const { searchValue: initialValue } = router.query;
  let { order } = router.query;

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (order === undefined) {
      order = "POPULAR";
    }

    router.push({ pathname: "/search", query: { order: order, searchValue: value } });
  };

  return (
    <div className={`${size === "large" ? "max-w-632 px-48" : ""} mx-auto`}>
      <form
        onSubmit={handleSubmit}
        className={`
      ${className}
      ${
        size === "large" ? "border border-black tablet:border-2 " : "w-460 border border-gray-50"
      } flex items-center justify-center rounded-100`}
      >
        <div className={size === "large" ? "size-34 tablet:size-49" : "size-33"}></div>
        <input
          value={value}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder="리뷰가 궁금한 여행지를 검색해보세요!"
          className="flex-1 text-center text-12 font-regular leading-18 focus:outline-none tablet:text-16 tablet:leading-24"
        />
        <button
          className={`${
            size === "large" ? "size-34 tablet:size-49" : "size-33"
          } m-2 flex items-center justify-center rounded-100 bg-black tablet:m-6`}
        >
          <Image
            draggable={false}
            src={searchIcon}
            width={`${size === "large" ? 19 : 13}`}
            height={`${size === "large" ? 19 : 13}`}
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
