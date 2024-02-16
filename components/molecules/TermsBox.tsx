import Image from "next/image";
import checked from "@/public/images/icons/checked.svg";

function TermsBox() {
  return (
    <div>
      <label className="flex gap-12 ml-10 mb-10 items-center">
        <input type="checkbox" value="male" className="h-18 w-18 appearance-none" checked={true} />
        <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
        TRIMO 가입 약관에 모두 동의 합니다.
      </label>

      <div className="flex flex-col gap-5 border border-gray-300 rounded-10">
        <label className="flex gap-12 m-10 items-center">
          <input type="checkbox" value="male" className="h-18 w-18 appearance-none" checked={true} />
          <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
          개인정보 수집 이용 동의 (필수)
        </label>
        <label className="flex gap-12 m-10 items-center">
          <input type="checkbox" value="male" className="h-18 w-18 appearance-none" checked={true} />
          <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
          고유식별 정보처리 동의 (필수)
        </label>
        <label className="flex gap-12 m-10 items-center">
          <input type="checkbox" value="male" className="h-18 w-18 appearance-none" checked={true} />
          <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
          통신사 이용약관 동의 (필수)
        </label>
        <label className="flex gap-12 m-10 items-center">
          <input type="checkbox" value="male" className="h-18 w-18 appearance-none" checked={true} />
          <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
          서비스 이용약관 동의 (필수)
        </label>
        <label className="flex gap-12 m-10 items-center">
          <input type="checkbox" value="male" className="h-18 w-18 appearance-none" checked={true} />
          <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
          마케팅 정보 수신 동의 (선택)
        </label>
      </div>
    </div>
  );
}

export default TermsBox;
