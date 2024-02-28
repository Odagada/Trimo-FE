import Image from "next/image";
import { TERMS } from "@/constants/signupConstants";
import Clickable from "@/components/atoms/Clickable";
import useHandleTermsCheck from "@/hooks/signup/useHandleTermsCheck";
import checked from "@/public/images/icons/checked.svg";
import notChecked from "@/public/images/icons/notChecked.svg";

export interface SignupContentProps {
  progressStatus: () => void;
}

function TermsAgreements({ progressStatus }: SignupContentProps) {
  const { checkedTerms, handleSingleCheck, handleAllCheck, validateTermCheck } = useHandleTermsCheck({
    progressStatus,
  });

  return (
    <div className="tablet:mt-50 mt-30 relative">
      <div className="maxTablet:hidden absolute right-15 -top-23">
        <label className="flex gap-8">
          <input
            type="checkbox"
            value="term"
            className="h-18 w-18 appearance-none"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkedTerms.length === TERMS.length}
          />
          {checkedTerms.length === TERMS.length ? (
            <Image src={checked} alt="checked" width={20} height={20} />
          ) : (
            <Image src={notChecked} alt="checked" width={20} height={20} />
          )}
          전체 동의
        </label>
      </div>

      {TERMS.map((termContent, key) => {
        return (
          <div key={key}>
            <h5 className="mb-10 maxTablet:hidden">{termContent.title}</h5>
            <pre
              className={`${
                key === 0 && "maxTablet:hidden"
              } maxTablet:hidden w-680 h-200 text-12 rounded-[10px] border border-zinc-400 p-20 overflow-y-auto overflow-x-hidden scrollbar-hide`}
            >
              {termContent.content}
            </pre>
            <pre
              className={`${
                key === 0 && "maxTablet:hidden"
              } tablet:hidden w-290 h-350 text-10 rounded-[10px] border border-zinc-400 px-25 py-15 overflow-y-auto overflow-x-hidden scrollbar-hide`}
            >
              {termContent.mobileContent}
            </pre>
            <label
              className={`${
                key === 0 && "maxTablet:hidden"
              } flex gap-10 tablet:m-9 maxTablet:mt-18 maxTablet:mb-15 tablet:mb-40 maxTablet:rounded-10 maxTablet:h-45 items-center text-14 maxTablet:bg-gray-10 maxTablet:w-full maxTablet:p-15`}
            >
              <input
                type="checkbox"
                value="term"
                className="h-18 w-18 appearance-none"
                onChange={(e) => handleSingleCheck(e.target.checked, termContent.termNo)}
                checked={checkedTerms.includes(termContent.termNo)}
              />
              {checkedTerms.includes(termContent.termNo) ? (
                <Image src={checked} alt="checked" width={17} height={17} className="absolute" />
              ) : (
                <Image src={notChecked} alt="checked" width={17} height={17} className="absolute" />
              )}
              {termContent.agreementText}
            </label>
          </div>
        );
      })}
      <button className="w-full" onClick={validateTermCheck}>
        <Clickable size="large" className="w-full">
          다음
        </Clickable>
      </button>
    </div>
  );
}

export default TermsAgreements;
