import { useEffect, useLayoutEffect, useState } from "react";
import SuccessPage from "@/pages/signup/components/SignUpSuccess";
import TermsAgreements from "@/pages/signup/components/TermsAgreements";
import WriteAdditionalInfo from "@/pages/signup/components/WriteAdditionalInfo";
import { LoginOauthType } from "@/types/server.types";
import useManageUserAccessToken from "../useManageUserAccessToken";
import { useRouter } from "next/router";
import Spinner from "@/components/atoms/Spinner";

function useSignUp(userOAuthData: LoginOauthType) {
  const [signUpStatus, setSignUpStatus] = useState(-1);
  const [nickname, setNickname] = useState("");

  const { saveUserAccessToken } = useManageUserAccessToken();
  const router = useRouter();

  const renderContentOnProgress = () => {
    switch (signUpStatus) {
      case -1:
        return <Spinner />;
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
    if (signUpStatus === -1) return currStepArray;
    for (let i = 0; i <= signUpStatus; i++) currStepArray[i] = 1;

    return currStepArray;
  };

  const setUserNickname = (nickname: string) => setNickname(nickname);

  const progressStatus = () => setSignUpStatus((prev) => ++prev);

  useEffect(() => {
    if (userOAuthData?.role === "ROLE_USER") {
      saveUserAccessToken(userOAuthData.accessToken, `${userOAuthData.nickName}으로 로그인 되었습니다! 🤗`);
      router.push("/");
    } else {
      progressStatus();
    }
  }, []);

  return { calculateStepArray, renderContentOnProgress };
}

export default useSignUp;
