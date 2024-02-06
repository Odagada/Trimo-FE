import Image from "next/image";
import { useCallback, useState } from "react";

const SearchBar = ({ initialValue = "" }: { initialValue?: string }) => {
  const calculatedValue = useCallback(() => {
    if (initialValue) {
      return `"${initialValue}"에 대한 검색 결과입니다`;
    } else {
      return "";
    }
  }, [initialValue])();

  const [value, setValue] = useState(calculatedValue);

  return (
    <div className="w-1/2 m-auto border border-black rounded-100 flex items-center justify-center">
      <div className="w-49 h-49"></div>
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
      <div className="w-49 h-49 bg-black rounded-100 m-6 flex items-center justify-center">
        <Image src="/images/icons/search.svg" width={19} height={19} alt="" />
      </div>
    </div>
  );
};

export default SearchBar;
