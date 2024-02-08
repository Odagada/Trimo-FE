import Logo from "@/public/logos/smallLogo.png";
import Image from "next/image";
import defaultUserImg from "@/public/images/icons/defaultUserProfile.svg";
//import Clickable from "../atoms/Clickable";
import Link from "next/link";
import SearchBar from "../atoms/Inputs/SearchBar";
import { useEffect, useState } from "react";

function NavigationBar() {
  const isLoggedin = true;
  const [s, sa] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 150) {
        console.log("up");
        sa(false);
      } else {
        console.log("down");
        sa(true);
      }
    });
  }, [s]);

  // useEffect(() => {
  //   document.addEventListener("scrollend", () => {
  //     console.log("dd");
  //   });

  //   return () => {
  //     document.removeEventListener("scrollend", () => {
  //       console.log("ddddd");
  //     });
  //   };
  // }, []);

  const renderNavbarLeftSide = (isUserLoggedIn: boolean) => {
    if (isUserLoggedIn)
      return (
        <div className="flex items-center gap-12">
          <Image src={defaultUserImg} width={31} height={31} alt="default user profile" />
          <span className="text-16">닉네임</span>
        </div>
      );
    else
      return (
        <div className="flex gap-28 ">
          <Link href="/login" className="text-16">
            로그인
          </Link>
          <Link href="/login" className="text-16">
            회원가입
          </Link>
        </div>
      );
  };

  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex fixed w-full h-fit py-21 px-121 items-center justify-between flex-wrap bg-white ">
        <Image src={Logo} alt="logo" width={78} height={20}></Image>
        {renderNavbarLeftSide(isLoggedin)}
        {/* <Clickable size="small" className="px-10">
          <button>내 리뷰 작성</button>
        </Clickable> */}
      </div>
      <div className="mt-100 bg-black z-10 sticky top-0">
        <SearchBar size="small"></SearchBar>
      </div>
    </div>
  );
}

export default NavigationBar;
