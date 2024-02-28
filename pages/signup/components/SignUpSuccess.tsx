import Image from "next/image";
import Link from "next/link";
import Camera from "@/public/images/camera.png";
import { SIGNUP_SUCCESS_MESSAGE, WELCOMING_MESSAGE } from "@/constants/signupConstants";
import Clickable from "@/components/atoms/Clickable";

function SuccessPage({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col items-center">
      <Image src={Camera} width={260} height={200} className="mb-35 mt-46" alt="signup success"></Image>
      <div className="mb-35 flex flex-col items-center gap-15">
        <p className="text-28 font-bold">{`${nickname}${SIGNUP_SUCCESS_MESSAGE}`}</p>
        <span>{WELCOMING_MESSAGE}</span>
      </div>
      <Link href={"/"} className="w-full">
        <Clickable size="large" className="w-full">
          메인으로 이동
        </Clickable>
      </Link>
    </div>
  );
}

export default SuccessPage;
