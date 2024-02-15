import Clickable from "@/components/atoms/Clickable";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import Image from "next/image";
import Camera from "@/public/images/camera.png";

function Success() {
  <div className="h-screen flex w-full flex-col">
    <Nav navStatus="LoggedOut" />
    <ShadowBox>
      <div className="flex flex-col">
        <span className="text-20 font-bold text-center mb-15 mt-35">회원가입</span>
        <ProgressNavigator stepArray={[1, 0, 0]} />
      </div>
      <Image src={Camera} width={260} height={200} className="mt-46 mb-35" alt="signup success"></Image>
      <div className="flex flex-col gap-15 items-center">
        <p className="font-bold text-28">00님의 회원가입을 환영합니다.</p>
        <span>지금 바로 다양한 여행 리뷰를 감상해보세요!</span>
      </div>
      <button>
        <Clickable size="large"> 확인</Clickable>
      </button>
    </ShadowBox>
  </div>;
}

export default Success;
