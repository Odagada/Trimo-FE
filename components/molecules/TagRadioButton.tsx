import { ChangeEvent, ForwardedRef, Fragment, forwardRef, useState } from "react";
import Clickable from "../atoms/Clickable";
import Emoji from "../atoms/Emoji";
import { ChangeHandler } from "react-hook-form";

interface TagRadioButtonProps {
  onBlur: ChangeHandler;
  onChange: ChangeHandler;
  name: string;
  tag: "placeType" | "weather" | "companion";
}

function TagRadioButton(
  { onBlur, onChange, name, tag = "placeType" }: TagRadioButtonProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [selectedType, setSelectedType] = useState(`${name}disable`);

  let items: string[] = [];

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
    default:
      break;
  }

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.id);
    onChange(event);
  };

  return (
    <div className="flex gap-12">
      {items.map((item, index) => (
        <Fragment key={index}>
          <input
            type="radio"
            id={item}
            name={name}
            onBlur={onBlur}
            onChange={handleRadioChange}
            checked={selectedType === item}
            className="hidden"
            ref={ref}
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
        onBlur={onBlur}
        onChange={handleRadioChange}
        checked={selectedType === `${name}disable`}
        className="hidden"
        ref={ref}
        value=""
      />
      <label htmlFor={`${name}disable`} className="cursor-pointer">
        <Clickable color={selectedType === `${name}disable` ? "black" : "white-"} size="small" shape="capsule">
          <Emoji>선택 안함</Emoji>
        </Clickable>
      </label>
    </div>
  );
}

export default forwardRef<HTMLInputElement, TagRadioButtonProps>(TagRadioButton);
