import Image from "next/image";
import searchIcon from "@/public/icons/search.svg";
import useSearchValue from "@/hooks/useSearchValue";
import useSearchHandler from "@/useHandler/useSearchHandler";

const SearchBar = ({ size, className = "" }: { size: "large" | "small"; className?: string }) => {
  const [value, setValue] = useSearchValue();
  const { handleFocus, handleChange, handleSubmit } = useSearchHandler([value, setValue]);

  return (
    <div className={`${size === "large" ? "max-w-632 px-48" : "max-w-460 grow px-24"} mx-auto`}>
      <form
        onSubmit={handleSubmit}
        className={`
      ${className}
      ${
        size === "large" ? "border border-black tablet:border-2 " : "border border-gray-50"
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
