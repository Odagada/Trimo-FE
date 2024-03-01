import Image from "next/image";
import Link from "next/link";
import Camera from "@/public/images/camera.png";
import { SIGNUP_SUCCESS_MESSAGE, WELCOMING_MESSAGE } from "@/constants/signupConstants";
import Clickable from "@/components/atoms/Clickable";

function SuccessPage({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="maxTablet:w-165">
        <Image src={Camera} width={260} height={200} className="mb-35 mt-46" alt="signup success"></Image>
      </div>
      <div className="mb-35 flex flex-col items-center gap-15 maxTablet:gap-5">
        <p className="font-bold maxTablet:text-18 tablet:text-28">{`${nickname}${SIGNUP_SUCCESS_MESSAGE}`}</p>
        <span className="maxTablet:text-12">{WELCOMING_MESSAGE}</span>
      </div>
      <Link href={"/"} className="w-full">
        <Clickable size="large" className="w-full maxTablet:text-14">
          메인으로 이동
        </Clickable>
      </Link>
    </div>
  );
}

export default SuccessPage;
