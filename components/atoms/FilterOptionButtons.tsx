import useSearchFilterOptions from "@/hooks/useFilterButtonsPopup";
import TagRadioButton from "../molecules/TagRadioButton";
import Clickable from "./Clickable";
import Emoji from "./Emoji";
import DeleteIcon from "./icons/DeleteIcon";
import Image from "next/image";
import { useState } from "react";
import arrow from "@/public/icons/carouselArrow.svg";

type filterOptionType = "날짜" | "유형" | "동행" | "날씨";
type filterOptionEngType = "date" | "placeType" | "companion" | "weather";

const filterOptions = {
  날짜: "date",
  유형: "placeType",
  동행: "companion",
  날씨: "weather",
};

const FilterOptionsButtons = ({ placeId }: { placeId: string[] }) => {
  const [reviewLayoutPageNum, setReviewLayoutPageNum] = useState<number>(0);

  const { OptionPopups, checkedMenu, setCheckedMenu, checkedOptions, setCheckedOptions } = useSearchFilterOptions({
    pageNum: reviewLayoutPageNum,
  });

  return (
    <div className="flex mb-20 justify-between">
      <div className="flex">
        {Object.keys(filterOptions).map((optionText, index) => (
          <>
            <div className="relative mr-10">
              {OptionPopups[index].isOpen && (
                <div
                  className={`${
                    optionText === "날짜" ? "w-330 h-164 px-25 pt-15" : "w-110 h-215 px-16 pt-17"
                  } shadow-main rounded-[15px] -left-18 top-40 absolute z-10 mt-8 ml-4 bg-white`}
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
                      console.log(checkedOptions);
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
                <Emoji>{optionText}</Emoji>
              </Clickable>
            </button>
          </>
        ))}
      </div>
      <div className="flex gap-16">
        <button
          onClick={() => {
            setReviewLayoutPageNum((prev) => (prev === 0 ? prev : --prev));
            console.log(reviewLayoutPageNum);
          }}
        >
          <Image src={arrow} width={34} height={34} alt="arrow" className="shadow-main rounded-full"></Image>
        </button>
        <button
          onClick={() => {
            setReviewLayoutPageNum((prev) => (prev + 1 < placeId.length / 6 ? ++prev : prev));
            console.log(reviewLayoutPageNum);
          }}
        >
          <Image src={arrow} width={34} height={34} alt="arrow" className="shadow-main rounded-full rotate-180"></Image>
        </button>
      </div>
    </div>
  );
};

export default FilterOptionsButtons;
