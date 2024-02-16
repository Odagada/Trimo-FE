import Image from "next/image";
import Camera from "@/public/images/camera.png";
import { SIGNUP_SUCCESS_MESSAGE, WELCOMING_MESSAGE } from "@/constants/signupConstants";

function SuccessPage({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col items-center">
      <Image src={Camera} width={260} height={200} className="mt-46 mb-35" alt="signup success"></Image>
      <div className="flex flex-col gap-15 items-center">
        <p className="font-bold text-28">{`${nickname}${SIGNUP_SUCCESS_MESSAGE}`}</p>
        <span>{WELCOMING_MESSAGE}</span>
      </div>
    </div>
  );
}

export default SuccessPage;
