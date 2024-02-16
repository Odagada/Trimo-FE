import { useState } from "react";
import SuccessPage from "@/pages/signup/components/SignUpSuccess";
import TermsAgreements from "@/pages/signup/components/TermsAgreements";
import WriteAdditionalInfo from "@/pages/signup/components/WriteAdditionalInfo";

function useSignUp() {
  const [signUpStatus, setSignUpStatus] = useState(0);
  const [nickname, setNickname] = useState("");

  const storeAccessToken = (accessToken: string) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  };
  const renderContentOnProgress = () => {
    switch (signUpStatus) {
      case 0:
        return <TermsAgreements progressStatus={progressStatus} />;
      case 1:
        return <WriteAdditionalInfo progressStatus={progressStatus} setNickname={setUserNickname} />;
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

  return { calculateStepArray, renderContentOnProgress, storeAccessToken };
}

export default useSignUp;
