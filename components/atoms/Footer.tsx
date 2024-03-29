import logo from "@/public/logos/TRIMO.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-50 px-24 py-20 tablet:px-64 tablet:pb-35 tablet:pt-24 laptop:px-120 laptop:pb-44 laptop:pt-26">
      <Image draggable={false} className="text-white" src={logo} alt="" width={62} height={30} />
      <div className="mt-8 ">
        <p className="text-12 leading-18 text-white">
          여행 기록 서비스, 트리모
          <br />
          <Link href="https://www.notion.so/acceptagreed/ad6a640d9302461086c474f541f263f4?pvs=4">개인정보처리방침</Link>
        </p>

        <p className="mt-32 text-8 leading-12 text-gray-30">
          ⓒ 2024 Trimo. All rights reserved
          <br />
          Contact
        </p>
      </div>
    </div>
  );
};

export default Footer;
