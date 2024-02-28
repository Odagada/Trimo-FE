import useSearchFilterOptions from "@/hooks/useFilterButtonsPopup";
import TagRadioButton from "../molecules/TagRadioButton";
import Clickable from "./Clickable";
import Emoji from "./Emoji";
import DeleteIcon from "./icons/DeleteIcon";
import Image from "next/image";
import { useState } from "react";
import arrow from "@/public/icons/carouselArrow.svg";
import { useMediaQuery } from "react-responsive";

type filterOptionType = "날짜" | "유형" | "동행" | "날씨";
type filterOptionEngType = "date" | "placeType" | "companion" | "weather";

const filterOptions = {
  날짜: "date",
  유형: "placeType",
  동행: "companion",
  날씨: "weather",
};

const FilterOptionsButtons = ({ placeId, setQuery }: { placeId: string[]; setQuery: (query: string) => void }) => {
  const [reviewLayoutPageNum, setReviewLayoutPageNum] = useState<number>(1);

  const { OptionPopups, checkedMenu, setCheckedMenu, checkedOptions, setCheckedOptions } = useSearchFilterOptions({
    pageNum: reviewLayoutPageNum,
    setQuery,
  });

  const isBelowDesktop = useMediaQuery({
    query: "(max-width: 1440px)",
  });

  return (
    <div className="mb-20 flex justify-between maxTablet:mb-10">
      <div className="flex">
        {Object.keys(filterOptions).map((optionText, index) => (
          <>
            <div className="relative mr-10">
              {OptionPopups[index].isOpen && (
                <div
                  className={`${
                    optionText === "날짜" ? "h-164 w-330 px-25 pt-15" : "h-215 w-110 px-16 pt-17"
                  } absolute -left-18 top-40 z-10 ml-4 mt-8 rounded-[15px] bg-white shadow-main`}
                  ref={OptionPopups[index].popupRef}
                >
                  <button
                    onClick={() => {
                      OptionPopups[index].setIsOpen(false);
                      setCheckedMenu(null);
                    }}
                    type="button"
                    className={`absolute top-4 ${optionText === "날짜" ? "right-7" : "right-4"}`}
                  >
                    <DeleteIcon size="small" />
                  </button>
                  <TagRadioButton
                    onChange={(e) => {
                      if (typeof e === "undefined") e = "";
                      setCheckedOptions((prev) => ({ ...prev, [optionText]: e }));
                    }}
                    tag={filterOptions[optionText as filterOptionType] as filterOptionEngType}
                    value={checkedOptions[optionText as filterOptionType]}
                    isSmall
                  ></TagRadioButton>
                </div>
              )}
            </div>
            <button
              ref={OptionPopups[index].btnRef}
              type="button"
              onClick={(e) => {
                checkedMenu === optionText ? setCheckedMenu(null) : setCheckedMenu(optionText);
                OptionPopups[index].setIsOpen((prev) => !prev);
              }}
              key={index}
            >
              <Clickable color={checkedMenu === optionText ? "black" : "white-"} size="small" shape="capsule">
                {/* @ts-ignore */}
                <Emoji>{optionText}</Emoji>
              </Clickable>
            </button>
          </>
        ))}
      </div>
      <div className="flex gap-16 maxTablet:absolute maxTablet:bottom-135 maxTablet:gap-250">
        <button
          onClick={() => {
            setReviewLayoutPageNum((prev) => (prev === 1 ? prev : --prev));
          }}
        >
          <Image src={arrow} width={34} height={34} alt="arrow" className="rounded-full shadow-main"></Image>
        </button>
        <button
          onClick={() => {
            setReviewLayoutPageNum((prev) => (prev < placeId.length / (isBelowDesktop ? 4 : 6) ? ++prev : prev));
          }}
        >
          <Image
            src={arrow}
            width={34}
            height={34}
            alt="arrow"
            className="rotate-180 rounded-full shadow-[0_-5px_15px_rgb(0,0,0,0.1)]"
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default FilterOptionsButtons;
