import Logo from "@/public/logos/navLogo.png";
import Image from "next/image";
import defaultProfile from "@/public/images/defaultProfile.png";
import Link from "next/link";
import { NavStatus } from "@/types/client.types";
import useComponentPopup from "@/hooks/useComponentPopup";
import HeaderDropdown from "../atoms/Dropdowns/HeaderDropdown";

interface NavProps {
  navStatus?: NavStatus;
  hasSearchBar?: boolean;
  className?: string;
}

function Nav({ navStatus = "LoggedIn" }: NavProps) {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useComponentPopup();

  const renderNavbarLeftSide = (status: NavStatus) => {
    switch (status) {
      case "onlyLogo":
        return;
      case "LoggedIn":
        return (
          <div className="relative">
            <button className="flex items-center gap-12" ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
              <Image draggable={false} src={defaultProfile} width={22} height={22} alt="default user profile" />
              <span className="text-16">닉네임</span>
            </button>
            {isOpen && <HeaderDropdown ref={popupRef} />}
          </div>
        );
      case "LoggedOut":
        return (
          <div className="gap-28 flex">
            <Link href="/login" className="text-16">
              로그인
            </Link>
          </div>
        );
    }
  };

  return (
    <nav className="h-fit mb-66 flex flex-col w-full">
      <div className="z-50 h-fit py-12 px-121 fixed top-0 flex flex-wrap items-center justify-between w-full bg-white">
        <h1>
          <Link href="/">
            <Image draggable={false} src={Logo} alt="trimo logo" width={78} height={20} />
          </Link>
        </h1>
        <span id="navSearchBar" className="h-50"></span>
        {renderNavbarLeftSide(navStatus)}
      </div>
    </nav>
  );
}

export default Nav;
