import logo from "@/public/logos/TRIMO.svg";
import Image from "next/image";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${className} bg-gray-50 px-120 pt-26 pb-44`}>
      <Image draggable={false} className="text-white" src={logo} alt="" width={62} height={30} />
      <div className="mt-8 ">
        <p className="text-white text-12 leading-18">
          여행 기록 서비스, 트리모
          <br />
          개인정보처리방침 | 서비스 이용약관
        </p>

        <p className="text-gray-30 text-8 mt-32 leading-12">
          ⓒ 2024 Trimo. All rights reserved
          <br />
          Contact
        </p>
      </div>
    </div>
  );
};

export default Footer;
