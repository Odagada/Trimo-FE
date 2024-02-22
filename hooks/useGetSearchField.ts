import { useController } from "react-hook-form";
import { Control } from "react-hook-form";

interface query {
  month?: "1월" | "2월" | "3월" | "4월" | "5월" | "6월" | "7월" | "8월" | "9월" | "10월" | "11월" | "12월";
  visitingTime?: string;
  placeType?: "맛집" | "관광" | "휴양" | "명소";
  weather?: "맑음" | "흐림" | "우천" | "눈";
  companion?: "가족" | "친구" | "연인" | "혼자";
}

export default function useGetSearchField(control: Control<query>) {
  const { field: month } = useController({
    name: "month",
    control: control,
  });
  const { field: visitingTime } = useController({
    name: "visitingTime",
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
  return { month, visitingTime, placeType, companion, weather };
}
