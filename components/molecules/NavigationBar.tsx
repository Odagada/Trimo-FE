import Logo from "@/public/logos/navLogo.png";
import Image from "next/image";
import defaultProfile from "@/public/images/defaultProfile.png";
import Link from "next/link";
import useComponentPopup from "@/hooks/useComponentPopup";
import HeaderDropdown from "../atoms/Dropdowns/HeaderDropdown";
import { useEffect, useState } from "react";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { User } from "@/types/client.types";

interface NavProps {
  isOnlyLogo?: boolean;
  hasSearchBar?: boolean;
  className?: string;
  isLoggedIn?: boolean;
}

type NavStatusType = "onlyLogo" | "LoggedIn" | "LoggedOut";

function Nav({ isOnlyLogo = false, isLoggedIn = false }: NavProps) {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useComponentPopup();

  const [navStatus, setNavStatus] = useState<NavStatusType>();
  const [userData, setUserData] = useState<User | null>();

  const { userDataRef, requestUserData } = useGetUserInfo();

  const fetchUserData = async () => {
    await requestUserData();
    setUserData(userDataRef.current);
  };

  useEffect(() => {
    if (!isOnlyLogo) isLoggedIn ? setNavStatus("LoggedIn") : setNavStatus("LoggedOut");

    fetchUserData();
  }, [isLoggedIn, isOnlyLogo, navStatus, userDataRef]);

  const renderNavbarLeftSide = () => {
    switch (navStatus) {
      case "onlyLogo":
        return;
      case "LoggedIn":
        return (
          <div className="relative">
            <button className="flex items-center gap-12" ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
              <div className="overflow-hidden mobile:w-25 mobile:h-25 h-20 w-20 rounded-full flex items-center">
                <Image
                  width={25}
                  height={25}
                  draggable={false}
                  src={userData?.imageUrl || defaultProfile}
                  objectFit="cover"
                  alt="default user profile"
                />
              </div>
              <span className="mobile:text-16 text-12">{userData?.nickName}</span>
            </button>
            {isOpen && <HeaderDropdown ref={popupRef} fetchUserData={fetchUserData} />}
          </div>
        );
      case "LoggedOut":
        return (
          <div className="gap-28 flex">
            <Link href="/login" className="mobile:text-16 text-12">
              로그인
            </Link>
          </div>
        );
    }
  };

  return (
    <nav className="h-fit mobile:mb-74 mb-50 flex flex-col w-full">
      <div className="z-50 h-fit h-30 mobile:py-12 py-0 mobile:px-121 px-20 fixed top-0 flex flex-wrap items-center justify-between w-full bg-white">
        <Link href="/">
          <div className="mobile:w-78 mobile:h-20 w-50 h-24 flex items-center">
            <Image draggable={false} src={Logo} alt="trimo logo" width={78} height={20} />
          </div>
        </Link>
        <span id="navSearchBar" className="h-50"></span>
        {renderNavbarLeftSide()}
      </div>
    </nav>
  );
}

export default Nav;
