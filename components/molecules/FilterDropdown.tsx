import React from "react";
import Image from "next/image";
import useComponentPopup from "@/hooks/useComponentPopup";
import FilterImg from "@/public/icons/filter.svg";
import DeleteIcon from "@/components/atoms/icons/DeleteIcon";
import Clickable from "../atoms/Clickable";

export default function FilterDropdown() {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useComponentPopup();
  return (
    <div>
      <button
        className="px-15 border-gray-20 py-6 border rounded-full"
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex-center w-16 h-16">
          <Image draggable={false} src={FilterImg} alt="필터 이미지" />
        </div>
      </button>
      <div className="relative w-screen">
        {isOpen && (
          <div
            className="w-617 left-1/2 shadow-main rounded-30 absolute px-20 pt-16 pb-24 -translate-x-1/2"
            ref={popupRef}
          >
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <DeleteIcon size="large" />
              </button>
            </div>
            <div className="flex justify-end">
              <button>
                <Clickable shape="capsule" size="small">
                  <div className="w-70">확인</div>
                </Clickable>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
