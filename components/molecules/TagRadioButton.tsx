import { ChangeEvent, Fragment, useState } from "react";
import Clickable from "../atoms/Clickable";
import Emoji from "../atoms/Emoji";
import { TagWithMonth } from "@/types/client.types";

interface TagRadioButtonProps {
  onChange: (arg: string) => void;
  name: string;
  tag: "placeType" | "weather" | "companion" | "date";
}

export default function TagRadioButton({ onChange, name, tag = "placeType" }: TagRadioButtonProps) {
  const [selectedType, setSelectedType] = useState(`${name}disable`);

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

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.id);
    onChange(event.target.value);
  };

  return (
    <div className="flex gap-12 flex-wrap">
      {items.map((item, index) => (
        <Fragment key={index}>
          <input
            type="radio"
            id={item}
            name={name}
            onChange={handleRadioChange}
            checked={selectedType === item}
            className="hidden"
            value={item}
          />
          <label htmlFor={item} className="cursor-pointer">
            <Clickable color={selectedType === item ? "black" : "white-"} size="small" shape="capsule">
              <Emoji>{item}</Emoji>
            </Clickable>
          </label>
        </Fragment>
      ))}
      <input
        type="radio"
        id={`${name}disable`}
        name={name}
        onChange={handleRadioChange}
        checked={selectedType === `${name}disable`}
        className="hidden"
        value=""
      />
      <label htmlFor={`${name}disable`} className="cursor-pointer">
        <Clickable color={selectedType === `${name}disable` ? "black" : "white-"} size="small" shape="capsule">
          <span>선택 안함</span>
        </Clickable>
      </label>
    </div>
  );
}
