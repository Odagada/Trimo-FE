import Clickable from "@/components/atoms/Clickable";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import Image from "next/image";
import Camera from "@/public/images/camera.png";

function SuccessPage({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col items-center">
      <Image src={Camera} width={260} height={200} className="mt-46 mb-35" alt="signup success"></Image>
      <div className="flex flex-col gap-15 items-center">
        <p className="font-bold text-28">{`${nickname}님의 회원가입을 환영합니다.`}</p>
        <span>지금 바로 다양한 여행 리뷰를 감상해보세요!</span>
      </div>
    </div>
  );
}

export default SuccessPage;
