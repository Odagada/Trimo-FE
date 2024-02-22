import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import { useRouter } from "next/router";
import useGetUserSocialInfo from "@/hooks/signup/useGetUserSocialInfo";
import useSignUp from "@/hooks/signup/useSignUp";
import Footer from "@/components/atoms/Footer";
import { useEffect } from "react";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { GetServerSidePropsContext } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { redirectByLoginStatus } from "@/utils/validateByLoginStatus";
import WriteAdditionalInfo from "./components/WriteAdditionalInfo";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);

    redirectByLoginStatus({
      statusToBlock: "Login",
      redirectUri: "/search?searchValue=&order=POPULAR",
      accessToken,
    });

    return {
      props: {},
    };
  } catch {
    return { notFound: true };
  }
};

function SignUp() {
  const router = useRouter();
  const { provider, code } = router.query;

  const { calculateStepArray, renderContentOnProgress } = useSignUp();
  const userSocialData = useGetUserSocialInfo({ code, provider });
  const { saveUserAccessToken } = useManageUserAccessToken();

  useEffect(() => {
    if (userSocialData?.role === "ROLE_USER") {
      saveUserAccessToken(
        userSocialData.accessToken,
        `이미 가입된 회원입니다. ${userSocialData.nickName}으로 로그인합니다.`
      );
      router.back();
    }
  }, [userSocialData]);

  return (
    <div className="h-screen flex w-full flex-col mt-20 mb-20">
      <Nav isOnlyLogo />
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
