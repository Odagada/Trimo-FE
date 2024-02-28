import useComponentPopup from "@/hooks/useComponentPopup";
import DropdownImg from "@/public/icons/dropdown.svg";
import { OrderValue, StringObj } from "@/types/client.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const values: OrderValue[] = ["인기순", "평점순", "최신순"];
const transQuery = {
  인기순: "POPULAR",
  평점순: "RATING",
  최신순: "RECENT",
};
const transString: { [key: string]: OrderValue } = {
  POPULAR: "인기순",
  RATING: "평점순",
  RECENT: "최신순",
};

export default function OrderDropdown() {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useComponentPopup();
  const router = useRouter();
  const { query } = router;
  const [currentOrder, setCurrentOrder] = useState<OrderValue>("인기순");

  const handleClick = (el: OrderValue) => {
    //TODO:api 추가
    router.push({ pathname: "/search", query: { ...query, order: transQuery[el] } });
    setCurrentOrder(el);
  };

  useEffect(() => {
    const { order } = query;
    if (order !== undefined && typeof order === "string") {
      setCurrentOrder(transString[order]);
    }
  }, [query]);

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
        <Image draggable={false} src={DropdownImg} alt="닫기" />
      </button>
      {isOpen && (
        <div className="absolute z-10 ml-4 mt-8 w-124 rounded-10 bg-white px-6 py-8 shadow-main" ref={popupRef}>
          {values.map((el) => (
            <button
              className={`h-27 w-full rounded-5 px-14 py-3 text-start ${
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
