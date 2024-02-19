import Image from "next/image";
import useComponentPopup from "@/hooks/useComponentPopup";
import FilterImg from "@/public/icons/filter.svg";
import SearchForm from "./SearchFrom";

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
            className="left-1/2 shadow-main rounded-30 absolute z-10 -translate-x-1/2 bg-white top-12"
            ref={popupRef}
          >
            <SearchForm closeDropdown={closeDropdown} />
          </div>
        )}
      </div>
    </div>
  );
}
