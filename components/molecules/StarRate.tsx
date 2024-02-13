import { useState } from "react";
import Star from "@/components/atoms/Star";
import { Stars } from "@/types/client.types";

interface Props {
  readOnly?: boolean;
  defaultRate?: number;
}

const stars: Stars[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function StarRate({ defaultRate = 0 }: Props) {
  const [rate, setRate] = useState(defaultRate);
  const [select, setSelect] = useState(0);

  const handleClick = (num: number) => {
    setRate(num);
    setSelect(num);
  };

  const handleMouseOver = (num: number) => {
    setRate(num);
  };

  const handleMouseOut = () => {
    setRate(select);
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
