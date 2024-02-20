import { useState } from "react";
import SuccessPage from "@/pages/signup/components/SignUpSuccess";
import TermsAgreements from "@/pages/signup/components/TermsAgreements";
import WriteAdditionalInfo from "@/pages/signup/components/WriteAdditionalInfo";
import { UserSocialLoginData } from "@/types/server.types";

function useSignUp() {
  const [signUpStatus, setSignUpStatus] = useState(0);
  const [nickname, setNickname] = useState("");

  const renderContentOnProgress = (userData: UserSocialLoginData) => {
    switch (signUpStatus) {
      case 0:
        return <TermsAgreements progressStatus={progressStatus} />;
      case 1:
        return (
          <WriteAdditionalInfo
            progressStatus={progressStatus}
            setNickname={setUserNickname}
            userAccessToken={userData.accessToken}
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

  return { calculateStepArray, renderContentOnProgress };
}

export default useSignUp;
