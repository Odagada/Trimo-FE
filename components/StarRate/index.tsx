import Star from "@/components/StarRate/Star";
import { useState } from "react";

const stars = [1, 2, 3, 4, 5];

export default function StarRate() {
  const [rate, setRate] = useState(0);
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
        />
      ))}
    </div>
  );
}
