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
    <div className="relative mt-30 tablet:mt-50">
      <div className="absolute -top-23 right-15 maxTablet:hidden">
        <label className="flex gap-8">
          <input
            type="checkbox"
            value="term"
            className="size-18 appearance-none"
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
              } border-zinc-400 h-200 w-680 overflow-y-auto overflow-x-hidden rounded-[10px] border p-20 text-12 scrollbar-hide maxTablet:hidden`}
            >
              {termContent.content}
            </pre>
            <pre
              className={`${
                key === 0 && "maxTablet:hidden"
              } border-zinc-400 h-350 w-290 overflow-y-auto overflow-x-hidden rounded-[10px] border px-25 py-15 text-10 scrollbar-hide tablet:hidden`}
            >
              {termContent.mobileContent}
            </pre>
            <label
              className={`${
                key === 0 && "maxTablet:hidden"
              } flex items-center gap-10 text-14 tablet:m-9 tablet:mb-40 maxTablet:mb-15 maxTablet:mt-18 maxTablet:h-45 maxTablet:w-full maxTablet:rounded-10 maxTablet:bg-gray-10 maxTablet:p-15`}
            >
              <input
                type="checkbox"
                value="term"
                className="size-18 appearance-none"
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
