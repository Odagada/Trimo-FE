import Clickable from "../atoms/Clickable";
import Emoji from "../atoms/Emoji";
import { TagWithMonth } from "@/types/client.types";

interface TagRadioButtonProps {
  onChange: (arg: string | undefined) => void;
  tag: "placeType" | "weather" | "companion" | "date";
  value: string | undefined;
  isSmall?: boolean;
}

export default function TagRadioButton({ onChange, tag = "placeType", value, isSmall = false }: TagRadioButtonProps) {
  let items: TagWithMonth[] = [];

  switch (tag) {
    case "placeType":
      items = ["맛집", "관광", "휴양", "명소"];
      break;
    case "weather":
      items = ["맑음", "흐림", "우천", "눈"];
      break;
    case "companion":
      items = ["가족", "친구", "연인", "혼자"];
      break;
    case "date":
      items = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
      break;
    default:
      break;
  }

  const handleRadioChange = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const select = event.currentTarget.id;
    if (select === value) {
      onChange(undefined);
      return;
    }
    onChange(select);
  };

  return (
    <div
      className={`${
        tag === "date"
          ? `grid ${
              isSmall
                ? "grid-cols-4 grid-rows-3 justify-items-center gap-10"
                : "grid-cols-6 grid-rows-2 justify-items-start gap-12"
            } `
          : "flex flex-wrap gap-12"
      }`}
    >
      {items.map((item, index) => (
        <button type="button" onClick={handleRadioChange} key={index} id={item}>
          <Clickable color={value === item ? "black" : "white-"} size="small" shape="capsule">
            <Emoji>{item}</Emoji>
          </Clickable>
        </button>
      ))}
    </div>
  );
}
