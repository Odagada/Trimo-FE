import { useState } from "react";
import { TERMS, INPUT_VALIDATION_MESSAGE } from "@/constants/signupConstants";
import { SignupContentProps } from "@/pages/signup/components/TermsAgreements";
import makeToast from "@/utils/makeToast";

function useHandleTermsCheck({ progressStatus }: SignupContentProps) {
  const [checkedTerms, setCheckedTerms] = useState<number[]>([]);

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedTerms((prev) => [...prev, id]);
    } else {
      setCheckedTerms(
        checkedTerms.filter((notCheckedTerm) => notCheckedTerm !== id)
      );
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      setCheckedTerms(TERMS.map((term) => term.termNo));
    } else {
      setCheckedTerms([]);
    }
  };

  const validateTermCheck = () => {
    if (checkedTerms.length !== TERMS.length) {
      makeToast(INPUT_VALIDATION_MESSAGE.TERM_NOT_ALL_CHECKED, "error");
      return;
    }
    makeToast(INPUT_VALIDATION_MESSAGE.TERM_ALL_CHECKED);
    progressStatus();
  };

  return { checkedTerms, handleSingleCheck, handleAllCheck, validateTermCheck };
}
export default useHandleTermsCheck;
