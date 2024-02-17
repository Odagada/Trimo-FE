import React from "react";
import Image from "next/image";
import useComponentPopup from "@/hooks/useComponentPopup";
import FilterImg from "@/public/icons/filter.svg";
import DeleteIcon from "@/components/atoms/icons/DeleteIcon";

export default function FilterDropdown() {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useComponentPopup();

  const closeDropdown = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        className="px-15 border-gray-20 py-6 border rounded-full"
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex-center w-16 h-16">
          <Image src={FilterImg} alt="필터 이미지" />
        </div>
      </button>
      <div className="absolute left-0 w-screen">
        {isOpen && (
          <div
            className="w-617 left-1/2 shadow-main rounded-30 absolute z-10 px-20 pt-16 pb-24 mt-12 -translate-x-1/2 bg-white"
            ref={popupRef}
          >
            <div className="flex justify-end">
              <button onClick={closeDropdown}>
                <DeleteIcon size="large" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
