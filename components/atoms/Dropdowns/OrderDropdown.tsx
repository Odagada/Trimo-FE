import { useState } from "react";

const values = ["인기순", "평점순", "최신순"];

export default function OrderDropdown() {
  // const [select, setSelect] = useState('인기순')
  // const [isHover, setIsHover] = useState('')
  return (
    <div className="w-98 shadow-main rounded-10 p-6">
      {values.map((el) => (
        <div className="h-27 rounded-5 middle-text px-14 hover:bg-gray-20 w-full py-3" key={el}>
          {el}
        </div>
      ))}
    </div>
  );
}
