import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const useManageUserAccessToken = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userAccessToken"]);
  const router = useRouter();

  const saveUserAccessToken = (data: string, message?: string) => {
    const loginTime = 3600; //1시간
    const expiration = new Date(Date.now() + loginTime * 1000);
    setCookie("userAccessToken", data, { secure: true, sameSite: true, path: "/", expires: expiration });
    setTimeout(() => {
      alert("세션이 만료되었습니다. 다시 로그인 해 주세요.");
      window.location.reload();
    }, loginTime * 1000);
    message && setTimeout(() => alert(message), 1000); // 1초 뒤에 리다이렉트 된 후 alert 띄움
  };

  const removeUserAccessToken = ({ redirectUri }: { redirectUri: string }) => {
    removeCookie("userAccessToken", { path: "/" });
    alert("로그아웃 되었습니다!");
    router.push(redirectUri);
  };

  const userAccessToken = cookie.userAccessToken;

  return { userAccessToken, saveUserAccessToken, removeUserAccessToken };
};

export default useManageUserAccessToken;
