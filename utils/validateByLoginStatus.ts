import makeToast from "./makeToast";

interface Props {
  statusToBlock: "Login" | "Logout";
  accessToken: string | null;
}

export const validateRedirectionByLoginStatus = ({ statusToBlock, accessToken }: Props) => {
  if ((statusToBlock === "Login" && accessToken) || (statusToBlock === "Logout" && !accessToken)) {
    makeToast(statusToBlock === "Login" ? "이미 로그인 된 상태입니다." : "로그인 후 이용해주세요", "error");
    return true;
  }
  return false;
};

export const isLoggedIn = (accessToken: string | null) => {
  return accessToken ? true : false;
};
