import { useState } from "react";
import Star from "@/components/atoms/Star";

interface Props {
  readOnly?: boolean;
  defaultRate?: number;
}

const stars = [1, 2, 3, 4, 5];

export default function StarRate({ readOnly = false, defaultRate = 0 }: Props) {
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
    <div className="flex">
      {stars.map((el) => (
        <Star
          isChecked={el > rate}
          key={`star${el}`}
          rate={el}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
