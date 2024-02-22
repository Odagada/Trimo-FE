import { useForm, useController } from "react-hook-form";
import { SearchOption } from "../atoms/SearchOption";
import DeleteIcon from "../atoms/icons/DeleteIcon";
import TimePicker from "../atoms/TimePicker";
import TagRadioButton from "./TagRadioButton";
import Clickable from "../atoms/Clickable";
import { useRouter } from "next/router";
import { MouseEvent, useEffect } from "react";
import filterObject from "@/utils/filterObject";
import useGetSearchField from "@/hooks/useGetSearchField";
import resetIcon from "@/public/icons/resetIcon.svg";
import Image from "next/image";

interface query {
  month?: "1월" | "2월" | "3월" | "4월" | "5월" | "6월" | "7월" | "8월" | "9월" | "10월" | "11월" | "12월";
  visitingTime?: string;
  placeType?: "맛집" | "관광" | "휴양" | "명소";
  weather?: "맑음" | "흐림" | "우천" | "눈";
  companion?: "가족" | "친구" | "연인" | "혼자";
}

interface Props {
  closeDropdown: () => void;
}

export default function SearchForm({ closeDropdown }: Props) {
  const router = useRouter();
  const { query: queryObj } = router;

  const defaultValues: query = {
    month: undefined,
    visitingTime: undefined,
    placeType: undefined,
    weather: undefined,
    companion: undefined,
  };
  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues });
  const { month, visitingTime, placeType, weather, companion } = useGetSearchField(control);

  useEffect(() => {
    Object.entries(queryObj).forEach((data) => {
      const key = data[0] as "month" | "visitingTime" | "placeType" | "weather" | "companion";
      const value = data[1] as string;
      setValue(key, value);
    });
  }, [queryObj, setValue]);

  function handleSearch(data: query) {
    const searchQuery = filterObject(data);
    router.push({ query: { ...queryObj, ...searchQuery } });
    closeDropdown();
  }
  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <SearchOption>
        <div className="flex justify-end">
          <button onClick={closeDropdown} type="button">
            <DeleteIcon size="large" />
          </button>
        </div>
        <SearchOption.section>
          <SearchOption.title>날짜</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>방문하신 날짜를 선택해주세요.</SearchOption.description>
            <TagRadioButton onChange={month.onChange} tag="date" value={month.value} />
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>방문시간</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>방문하신 시간을 선택해주세요.</SearchOption.description>
            <div onClick={(e: MouseEvent) => e.stopPropagation()}>
              <TimePicker onChange={visitingTime.onChange} value={visitingTime.value} />
            </div>
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>유형</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>어떤 타입의 여행지를 다녀오셨나요?</SearchOption.description>
            <TagRadioButton onChange={placeType.onChange} tag="placeType" value={placeType.value} />
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>동행</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>누구와 함께 여행지를 다녀오셨나요?</SearchOption.description>
            <TagRadioButton onChange={companion.onChange} tag="companion" value={companion.value} />
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>날씨</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>그날의 날씨는 어땠나요?</SearchOption.description>
            <TagRadioButton onChange={weather.onChange} tag="weather" value={weather.value} />
          </SearchOption.info>
        </SearchOption.section>
        <div className="flex justify-end gap-12">
          <button type="button" onClick={() => reset()}>
            <Clickable size="small" shape="capsule" color="white" className="flex justify-end item-center gap-10">
              <span className="font-bold">초기화</span>
              <Image src={resetIcon} alt="resetIcon" />
            </Clickable>
          </button>
          <button type="submit">
            <Clickable size="small" shape="capsule">
              확인
            </Clickable>
          </button>
        </div>
      </SearchOption>
    </form>
  );
}
