import useComponentPopup from "@/hooks/useComponentPopup";
import DropdownImg from "@/public/icons/dropdown.svg";
import { OrderValue } from "@/types/client.types";
import Image from "next/image";
import { useState } from "react";

const values: OrderValue[] = ["인기순", "평점순", "최신순"];

export default function OrderDropdown() {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useComponentPopup();
  const [currentOrder, setCurrentOrder] = useState<OrderValue>("최신순");

  const handleClick = (el: OrderValue) => {
    //TODO:api 추가
    setCurrentOrder(el);
  };

  return (
    <div className="middle-text relative">
      <button
        ref={buttonRef}
        className="flex"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <span>정렬</span>
        <Image src={DropdownImg} alt="닫기" />
      </button>
      {isOpen && (
        <div className="w-124 shadow-main rounded-10 absolute z-10 px-6 py-8 mt-8 ml-4 bg-white" ref={popupRef}>
          {values.map((el) => (
            <button
              className={`h-27 rounded-5 px-14 text-start w-full py-3 ${
                el === currentOrder ? "bg-gray-20 font-semiBold" : "hover:bg-gray-10 hover:font-semiBold "
              }`}
              key={el}
              onClick={() => handleClick(el)}
            >
              {el}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
