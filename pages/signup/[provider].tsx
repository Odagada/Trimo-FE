import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import { useRouter } from "next/router";
import useGetUserSocialInfo from "@/hooks/signup/useGetUserSocialInfo";
import useSignUp from "@/hooks/signup/useSignUp";
import Footer from "@/components/atoms/Footer";
import { useEffect } from "react";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import useRedirectBasedOnLoginStatus from "@/hooks/useRedirectBasedOnLoginStatus";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);

    return {
      props: { accessToken },
    };
  } catch {
    return { notFound: true };
  }
};

function SignUp({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { provider, code } = router.query;

  useRedirectBasedOnLoginStatus({ statusToBlock: "Login", accessToken });

  const { calculateStepArray, renderContentOnProgress } = useSignUp();
  const { data: userSocialData } = useGetUserSocialInfo({ code, provider });
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
      <Nav />
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
