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
        className="rounded-full border border-gray-20 px-15 py-6"
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex-center size-16">
          <Image draggable={false} src={FilterImg} alt="필터 이미지" />
        </div>
      </button>
      <div className="absolute left-0 w-screen">
        {isOpen && (
          <div
            className="absolute left-1/2 top-12 z-10 -translate-x-1/2 rounded-30 bg-white shadow-main"
            ref={popupRef}
          >
            <SearchForm closeDropdown={closeDropdown} />
          </div>
        )}
      </div>
    </div>
  );
}
