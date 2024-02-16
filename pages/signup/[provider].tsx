import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import { useRouter } from "next/router";
import useGetUserSocialInfo from "@/hooks/signup/useGetUserSocialInfo";
import useSignUp from "@/hooks/signup/useSignUp";

function SignUp() {
  const router = useRouter();
  const { provider, code } = router.query;

  const { calculateStepArray, renderContentOnProgress, storeAccessToken } = useSignUp();

  const userSocialData = useGetUserSocialInfo({ code, provider });
  if (storeAccessToken) storeAccessToken(userSocialData.data.accessToken!);

  return (
    <div className="h-screen flex w-full flex-col mt-20 mb-20">
      <Nav navStatus="LoggedOut" />
      <ShadowBox className="relative">
        <span className="text-20 font-bold text-center mb-15 mt-35">회원가입</span>
        <ProgressNavigator stepArray={calculateStepArray()}></ProgressNavigator>
        {renderContentOnProgress()}
      </ShadowBox>
    </div>
  );
}

export default SignUp;
