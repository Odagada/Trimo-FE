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
              <div className="flex h-25 w-25 items-center overflow-hidden rounded-full">
                <Image
                  width={25}
                  height={25}
                  draggable={false}
                  src={userData?.imageUrl || defaultProfile}
                  objectFit="cover"
                  alt="default user profile"
                />
              </div>
              <span className="text-16">{userData?.nickName}</span>
            </button>
            {isOpen && <HeaderDropdown ref={popupRef} fetchUserData={fetchUserData} />}
          </div>
        );
      case "LoggedOut":
        return (
          <div className="flex gap-28">
            <Link href="/login" className="text-16">
              로그인
            </Link>
          </div>
        );
    }
  };

  return (
    <nav className="mb-74 flex h-fit w-full flex-col">
      <div className="fixed top-0 z-50 flex h-fit w-full flex-wrap items-center justify-between bg-white px-121 py-12">
        <h1>
          <Link href="/">
            <Image draggable={false} src={Logo} alt="trimo logo" width={78} height={20} />
          </Link>
        </h1>
        <span id="navSearchBar" className="h-50"></span>
        {renderNavbarLeftSide()}
      </div>
    </nav>
  );
}

export default Nav;
