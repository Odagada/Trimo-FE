import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

const menuClass = "w-full flex-center h-26 hover:bg-gray-10 rounded-5";

const menus = [
  { text: "리뷰 작성", href: "/review" },
  { text: "나의 리뷰", href: "" },
  { text: "관심 리스트", href: "" },
  { text: "프로필 수정", href: "/profile" },
];

export default forwardRef(function HeaderDropdown(_, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      className="w-122 flex-center shadow-main rounded-10 text-15 leading-21 absolute right-0 flex flex-col gap-8 p-12 mt-12 bg-white"
      ref={ref}
    >
      {menus.map((el, idx) => (
        <Link href={el.href} className={menuClass} key={el.text}>
          <div>{el.text}</div>
        </Link>
      ))}
      <button className={menuClass}>로그아웃</button>
    </div>
  );
});
