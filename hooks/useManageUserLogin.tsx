import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const useManageUserLogin = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userData"]);
  const router = useRouter();

  const saveUserAccessToken = (data: string, message?: string) => {
    const loginTime = 3600; //1시간
    const expiration = new Date(Date.now() + loginTime * 1000);
    setCookie("userData", data, { secure: true, sameSite: true, path: "/", expires: expiration });
    setTimeout(() => {
      alert("세션이 만료되었습니다. 다시 로그인 해 주세요.");
      window.location.reload();
    }, loginTime * 1000);
    router.push("/");
    message && setTimeout(() => alert(message), 1000);
  };

  const removeUserAccessToken = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      removeCookie("userData");
      router.push("/");
      alert("정상적으로 로그아웃 되었습니다!");
    }
  };

  const userAccessToken = cookie.userData;

  return { userAccessToken, saveUserAccessToken, removeUserAccessToken };
};

export default useManageUserLogin;
