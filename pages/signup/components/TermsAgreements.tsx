import Image from "next/image";
import { useCallback, useState } from "react";
import checked from "@/public/images/icons/checked.svg";
import notChecked from "@/public/images/icons/notChecked.svg";
import { Terms } from "@/constants/signupTerms";
import Clickable from "@/components/atoms/Clickable";

interface Props {
  progressStatus: () => void;
}

function TermsAgreements({ progressStatus }: Props) {
  const [checkedTerms, setCheckedTerms] = useState<number[]>([]);

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedTerms((prev) => [...prev, id]);
    } else {
      setCheckedTerms(checkedTerms.filter((notCheckedTerm) => notCheckedTerm !== id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      setCheckedTerms(Terms.map((term) => term.termNo));
    } else {
      setCheckedTerms([]);
    }
  };

  const validateTermCheck = () => {
    if (checkedTerms.length !== Terms.length) {
      alert("모든 약관에 동의하셔야 회원가입이 가능합니다.");
      return;
    }
    alert("모든 약관에 동의하셨습니다.");
    progressStatus();
  };

  return (
    <div className="mt-60">
      <div className="absolute right-62">
        <label className="flex gap-8">
          <input
            type="checkbox"
            value="male"
            className="h-18 w-18 appearance-none"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkedTerms.length === Terms.length}
          />
          {checkedTerms.length === Terms.length ? (
            <Image src={checked} alt="checked" width={20} height={20} />
          ) : (
            <Image src={notChecked} alt="checked" width={20} height={20} />
          )}
          전체 동의
        </label>
      </div>

      {Terms.map((termContent, key) => {
        return (
          <>
            <h5 className="mb-12">{termContent.title}</h5>
            <p className="w-675 h-200 rounded-[10px] border border-zinc-400 p-20 overflow-y-auto" key={key}>
              {termContent.content}
            </p>
            <label className="flex gap-12 m-10 mb-50 items-center">
              <input
                type="checkbox"
                value="male"
                className="h-18 w-18 appearance-none"
                onChange={(e) => handleSingleCheck(e.target.checked, termContent.termNo)}
                checked={checkedTerms.includes(termContent.termNo)}
              />
              {checkedTerms.includes(termContent.termNo) ? (
                <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
              ) : (
                <Image src={notChecked} alt="checked" width={20} height={20} className="absolute" />
              )}
              동의
            </label>
          </>
        );
      })}
      <button className="w-full" onClick={validateTermCheck}>
        <Clickable size="large" className="w-full">
          확인
        </Clickable>
      </button>
    </div>
  );
}

export default TermsAgreements;
