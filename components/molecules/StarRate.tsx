import Star from "@/components/atoms/Star";
import { Stars } from "@/types/client.types";

interface Props {
  readOnly?: boolean;
  onChange: (arg: Stars) => void;
  value: Stars;
}

const stars: Stars[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function StarRate({ value = 0, onChange }: Props) {
  const handleClick = (num: Stars) => {
    onChange(num);
  };

  const handleMouseOver = (num: Stars) => {
    onChange(num);
  };

  const handleMouseOut = () => {
    onChange(value as Stars);
  };

  return (
    <div className="relative flex">
      {stars.map((el) => (
        <Star
          isChecked={el > value}
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
