import { useState } from "react";
import Star from "@/components/atoms/Star";
import { Stars } from "@/types/client.types";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  readOnly?: boolean;
  defaultRate?: number;
  setValue: UseFormSetValue<{
    title: string;
    content: string;
    tagValues: {
      weather: string;
      companion: string;
      placeType: string;
    };
    visitingTime: string;
    starRank: number;
  }>;
  value: number;
}

const stars: Stars[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function StarRate({ defaultRate = 0, setValue, value }: Props) {
  const [rate, setRate] = useState(defaultRate);

  const handleClick = (num: number) => {
    setRate(num);
    setValue("starRank", num);
  };

  const handleMouseOver = (num: number) => {
    setRate(num);
  };

  const handleMouseOut = () => {
    setRate(value);
  };

  return (
    <div className="flex relative">
      {stars.map((el) => (
        <Star
          isChecked={el > rate}
          key={`star${el}`}
          rate={el}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          halfStar={el % 1 !== 0}
        />
      ))}
    </div>
  );
}
