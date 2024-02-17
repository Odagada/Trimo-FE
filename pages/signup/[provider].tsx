import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import { useRouter } from "next/router";
import useGetUserSocialInfo from "@/hooks/signup/useGetUserSocialInfo";
import useSignUp from "@/hooks/signup/useSignUp";
import Footer from "@/components/atoms/Footer";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import useManageUserLogin from "@/hooks/useManageUserLogin";

function SignUp() {
  const router = useRouter();
  const { provider, code } = router.query;
  const [cookie, setCookie] = useCookies(["userData"]);

  const { calculateStepArray, renderContentOnProgress } = useSignUp();
  const userSocialData = useGetUserSocialInfo({ code, provider });
  const { saveUserAccessToken } = useManageUserLogin();

  useEffect(() => {
    if (userSocialData?.role === "ROLE_USER") {
      saveUserAccessToken(
        userSocialData.accessToken,
        `정상적으로 로그인 되었습니다!\n반갑습니다 ${userSocialData.nickName}님 😊`
      );
    }
  }, [userSocialData]);

  return (
    <div className="h-screen flex w-full flex-col mt-20 mb-20">
      <Nav navStatus="LoggedOut" />
      <ShadowBox className="relative">
        <span className="text-20 font-bold text-center mb-15 mt-35">회원가입</span>
        <ProgressNavigator stepArray={calculateStepArray()}></ProgressNavigator>
        {renderContentOnProgress(userSocialData!)}
      </ShadowBox>
      <Footer />
    </div>
  );
}

export default SignUp;
