import { useEffect, useLayoutEffect, useState } from "react";
import SuccessPage from "@/pages/signup/components/SignUpSuccess";
import TermsAgreements from "@/pages/signup/components/TermsAgreements";
import WriteAdditionalInfo from "@/pages/signup/components/WriteAdditionalInfo";
import { LoginOauthType } from "@/types/server.types";
import useManageUserAccessToken from "../useManageUserAccessToken";
import { useRouter } from "next/router";

function useSignUp(userOAuthData: LoginOauthType) {
  const [signUpStatus, setSignUpStatus] = useState(0);
  const [nickname, setNickname] = useState("");

  const { saveUserAccessToken } = useManageUserAccessToken();
  const router = useRouter();

  const renderContentOnProgress = () => {
    switch (signUpStatus) {
      case 0:
        return <TermsAgreements progressStatus={progressStatus} />;
      case 1:
        return (
          <WriteAdditionalInfo
            progressStatus={progressStatus}
            setNickname={setUserNickname}
            userAccessToken={userOAuthData.accessToken}
          />
        );
      case 2:
        return <SuccessPage nickname={nickname || ""} />;
    }
  };

  const calculateStepArray = () => {
    let currStepArray = [0, 0, 0];
    for (let i = 0; i <= signUpStatus; i++) currStepArray[i] = 1;

    return currStepArray;
  };

  const setUserNickname = (nickname: string) => setNickname(nickname);

  const progressStatus = () => setSignUpStatus((prev) => ++prev);

  useLayoutEffect(() => {
    if (userOAuthData?.role === "ROLE_USER") {
      saveUserAccessToken(
        userOAuthData.accessToken,
        `이미 가입된 회원입니다. ${userOAuthData.nickName}으로 로그인합니다.`
      );
      router.push("/");
    }
  }, []);

  return { calculateStepArray, renderContentOnProgress };
}

export default useSignUp;
