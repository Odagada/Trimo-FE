import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef } from "react";

export default forwardRef(function HeaderDropdown(_, ref: ForwardedRef<HTMLDivElement>) {
  const router = useRouter();
  const { userAccessToken, removeUserAccessToken } = useManageUserAccessToken();

  const menus = [
    { text: "내 리뷰 작성", onClick: () => {} },
    { text: "마이페이지", onClick: () => {} },
    {
      text: "로그아웃",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const handleLogout = () => {
    if (userAccessToken) {
      removeUserAccessToken();
      alert("정상적으로 로그아웃 되었습니다. 렌딩페이지로 이동합니다.");
      router.push("/");
    }
  };

  return (
    <div
      className="w-122 flex-center shadow-main rounded-10 text-15 leading-21 absolute right-0 flex flex-col gap-5 p-12 mt-12"
      ref={ref}
    >
      {menus.map((el, idx) => (
        <button className={`w-full ${idx === 0 && "border-b-gray-20 border-b"}`} key={el.text} onClick={el.onClick}>
          {el.text}
        </button>
      ))}
    </div>
  );
});
