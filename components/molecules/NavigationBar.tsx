import Logo from "@/public/logos/navLogo.png";
import Image from "next/image";
import defaultProfile from "@/public/images/defaultProfile.png";
import Link from "next/link";
import SearchBar from "../atoms/Inputs/SearchBar";
import { NavStatus } from "@/types/client.types";

interface NavProps {
  navStatus?: NavStatus;
  hasSearchBar?: boolean;
}

function Nav({ navStatus = "LoggedIn", hasSearchBar = false }: NavProps) {
  const renderNavbarLeftSide = (status: NavStatus) => {
    switch (status) {
      case "onlyLogo":
        return;
      case "LoggedIn":
        return (
          <div className="flex items-center gap-12">
            <Image src={defaultProfile} width={22} height={22} alt="default user profile" />
            <span className="text-16">닉네임</span>
          </div>
        );
      case "LoggedOut":
        return (
          <div className="flex gap-28 ">
            <Link href="/login" className="text-16">
              로그인
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-fit mb-66">
      <div className="flex z-50 fixed top-0 w-full h-fit py-21 px-121 items-center justify-between flex-wrap bg-white ">
        <Image src={Logo} alt="logo" width={78} height={20}></Image>
        {hasSearchBar && <SearchBar size="small"></SearchBar>}
        {renderNavbarLeftSide(navStatus)}
      </div>
    </div>
  );
}

export default Nav;
