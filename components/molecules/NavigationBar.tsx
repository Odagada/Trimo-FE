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
              <div className="flex size-20 items-center overflow-hidden rounded-full tablet:size-25">
                <Image
                  width={25}
                  height={25}
                  draggable={false}
                  src={userData?.imageUrl || defaultProfile}
                  objectFit="cover"
                  alt="default user profile"
                />
              </div>
              <span className="text-12 tablet:text-16">{userData?.nickName}</span>
            </button>
            {isOpen && <HeaderDropdown ref={popupRef} fetchUserData={fetchUserData} />}
          </div>
        );
      case "LoggedOut":
        return (
          <div className="flex gap-28">
            <Link href="/login" className="text-12 tablet:text-16">
              로그인
            </Link>
          </div>
        );
    }
  };

  return (
    <nav className="mb-50 flex h-fit w-full flex-col tablet:mb-74">
      <div className="fixed top-0 z-50 flex h-fit w-full flex-wrap items-center justify-between bg-white px-20 py-0 tablet:px-121 tablet:py-12">
        <Link href="/">
          <div className="flex h-24 w-50 items-center tablet:h-20 tablet:w-78">
            <Image draggable={false} src={Logo} alt="trimo logo" width={78} height={20} />
          </div>
        </Link>
        <span id="navSearchBar" className="flex h-50 grow"></span>
        {renderNavbarLeftSide()}
      </div>
    </nav>
  );
}

export default Nav;
