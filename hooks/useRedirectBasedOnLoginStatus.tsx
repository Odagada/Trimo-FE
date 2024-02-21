import { useRouter } from "next/router";
import { useCallback } from "react";

interface Props {
  statusToBlock: "Login" | "Logout";
  accessToken: string | null;
  redirectUri?: string | null;
}

function useRedirectBasedOnLoginStatus({ statusToBlock, accessToken, redirectUri = null }: Props) {
  const router = useRouter();

  const validateRedirection = useCallback(() => {
    if (typeof window === "undefined") return;
    if ((statusToBlock === "Login" && accessToken) || (statusToBlock === "Logout" && !accessToken)) {
      redirectUri && router.push(redirectUri);
      redirectUri || router.back();
      // alert(statusToBlock === "Login" ? "이미 로그인 된 상태입니다." : "로그인 후 이용해주세요");
      return;
    }
  }, [accessToken, redirectUri, router, statusToBlock]);

  validateRedirection();
}

export default useRedirectBasedOnLoginStatus;
