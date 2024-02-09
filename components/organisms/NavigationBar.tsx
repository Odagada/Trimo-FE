import Logo from "@/public/logos/smallLogo.png";
import Image from "next/image";
import defaultUserImg from "@/public/images/icons/defaultUserProfile.svg";
//import Clickable from "../atoms/Clickable";
import Link from "next/link";
import SearchBar from "../atoms/Inputs/SearchBar";
import { useState } from "react";

function NavigationBar() {
  const [isSearchbarOnHeader, setIsSearchbarOnHeader] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      //220이면 달라붙게,285(280)면 다시 떨어지게
      if (!isSearchbarOnHeader && window.scrollY >= 220 && window.scrollY <= 225) {
        console.log(window.scrollY);
        setIsSearchbarOnHeader(true);
      }
      if (isSearchbarOnHeader && window.scrollY <= 280 && window.scrollY >= 275) {
        console.log(window.scrollY);
        setIsSearchbarOnHeader(false);
      }
    };
  }
  // const isLoggedin = true;

  // const renderNavbarLeftSide = (isUserLoggedIn: boolean) => {
  //   if (isUserLoggedIn)
  //     return (
  //       <div className="flex items-center gap-12">
  //         <Image src={defaultUserImg} width={31} height={31} alt="default user profile" />
  //         <span className="text-16">닉네임</span>
  //       </div>
  //     );
  //   else
  //     return (
  //       <div className="flex gap-28 ">
  //         <Link href="/login" className="text-16">
  //           로그인
  //         </Link>
  //         <Link href="/login" className="text-16">
  //           회원가입
  //         </Link>
  //       </div>
  //     );
  // };

  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex fixed w-full h-fit py-21 px-121 items-center justify-between flex-wrap bg-white ">
        <Image src={Logo} alt="logo" width={78} height={20}></Image>
        {/* {renderNavbarLeftSide(isLoggedin)} */}
      </div>
      <div className="bg-black h-300"></div>
      <SearchBar size="small"></SearchBar>
    </div>
  );
}

export default NavigationBar;
