import { Review } from "@/types/client.types";
import { useController, useFieldArray } from "react-hook-form";
import { Control } from "react-hook-form";

export default function useGetForm(control: Control<Review>) {
  const { field: title } = useController({
    name: "title",
    control: control,
    rules: { required: "제목을 입력해 주세요." },
  });

  const { field: content } = useController({
    name: "content",
    control: control,
    rules: {
      required: "본문을 입력해 주세요.",
      maxLength: { value: 1000, message: "1,000자 이하로 입력해 주세요" },
    },
  });

  const { field: placeType } = useController({
    name: "placeType",
    control: control,
  });

  const { field: companion } = useController({
    name: "companion",
    control: control,
  });

  const { field: weather } = useController({
    name: "weather",
    control: control,
  });

  const { field: visitingTime } = useController({
    name: "visitingTime",
    control: control,
    rules: {
      required: "날짜를 입력해 주세요.",
    },
  });

  const { field: stars } = useController({
    name: "stars",
    control: control,
  });

  const images = useFieldArray({
    name: "images",
    control: control,
    rules: {
      maxLength: 10,
    },
  });

  return { title, content, placeType, companion, weather, visitingTime, stars, images };
}
