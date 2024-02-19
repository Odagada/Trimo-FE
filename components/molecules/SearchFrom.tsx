import { useForm, useController } from "react-hook-form";
import { SearchOption } from "../atoms/SearchOption";
import DeleteIcon from "../atoms/icons/DeleteIcon";
import TimePicker from "../atoms/TimePicker";
import TagRadioButton from "./TagRadioButton";
import Clickable from "../atoms/Clickable";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import filterObject from "@/utils/filterObject";

interface query {
  month?: "1월" | "2월" | "3월" | "4월" | "5월" | "6월" | "7월" | "8월" | "9월" | "10월" | "11월" | "12월";
  visitTime?: string;
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
    visitTime: undefined,
    placeType: undefined,
    weather: undefined,
    companion: undefined,
  };
  const { control, handleSubmit } = useForm({ defaultValues });

  const { field: month } = useController({
    name: "month",
    control: control,
  });
  const { field: visitTime } = useController({
    name: "visitTime",
    control: control,
  });
  const { field: placeType } = useController({
    name: "placeType",
    control: control,
  });
  const { field: weather } = useController({
    name: "weather",
    control: control,
  });
  const { field: companion } = useController({
    name: "companion",
    control: control,
  });
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
            <TagRadioButton onChange={month.onChange} name={month.name} tag="date" />
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>방문시간</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>방문하신 시간을 선택해주세요.</SearchOption.description>
            <div onClick={(e: MouseEvent) => e.stopPropagation()}>
              <TimePicker onChange={visitTime.onChange} />
            </div>
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>유형</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>어떤 타입의 여행지를 다녀오셨나요?</SearchOption.description>
            <TagRadioButton onChange={placeType.onChange} name={placeType.name} tag="placeType" />
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>동행</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>누구와 함께 여행지를 다녀오셨나요?</SearchOption.description>
            <TagRadioButton onChange={weather.onChange} name={weather.name} tag="weather" />
          </SearchOption.info>
        </SearchOption.section>
        <SearchOption.section>
          <SearchOption.title>날씨</SearchOption.title>
          <SearchOption.info>
            <SearchOption.description>그날의 날씨는 어땠나요?</SearchOption.description>
            <TagRadioButton onChange={companion.onChange} name={companion.name} tag="companion" />
          </SearchOption.info>
        </SearchOption.section>
        <div className="flex justify-end">
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
