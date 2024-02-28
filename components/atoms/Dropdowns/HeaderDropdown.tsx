import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

const menuClass = "w-full flex-center h-26 hover:bg-gray-10 rounded-5";

const menus = [
  { text: "리뷰 작성", href: "/review" },
  { text: "나의 리뷰", href: "" },
  { text: "관심 리스트", href: "" },
  { text: "프로필 수정", href: "/profile" },
];

export default forwardRef(function HeaderDropdown(
  { fetchUserData }: { fetchUserData: () => void },
  ref: ForwardedRef<HTMLDivElement>
) {
  const { removeUserAccessToken, userAccessToken } = useManageUserAccessToken();

  const handleLogout = () => {
    if (userAccessToken) {
      removeUserAccessToken({ redirectUri: "/" });
      fetchUserData();
    }
  };
  return (
    <div
      className="flex-center text-15 absolute right-0 mt-12 flex w-122 flex-col gap-8 rounded-10 bg-white p-12 leading-21 shadow-main"
      ref={ref}
    >
      {menus.map((el, idx) => (
        <Link href={el.href} className={menuClass} key={el.text}>
          <div>{el.text}</div>
        </Link>
      ))}
      <button className={menuClass} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
});
