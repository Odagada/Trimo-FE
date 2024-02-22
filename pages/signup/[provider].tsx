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
import { redirectByLoginStatus } from "@/utils/validateByLoginStatus";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const { provider, code } = context.query;

    const accessToken = await getAccessTokenFromCookie(context);

    const userOAuthData = await axios.get(
      `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/login/oauth/${provider}?code=${code}`
    );

    const isRedirectNeeded = redirectByLoginStatus({
      statusToBlock: "Login",
      redirectUri: "/search?searchValue=&order=POPULAR",
      accessToken,
    });

    if (isRedirectNeeded) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: { dehydratedState: dehydrate(queryClient), userOAuthData: userOAuthData.data },
      };
    }
  } catch {
    return { notFound: true };
  }
}

function SignUp({ userOAuthData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { calculateStepArray, renderContentOnProgress } = useSignUp(userOAuthData);

  return (
    <div className="h-screen flex w-full flex-col">
      <Nav isOnlyLogo />
      <ShadowBox className="relative">
        <span className="text-20 font-bold text-center mb-15 mt-35">회원가입</span>
        <ProgressNavigator stepArray={calculateStepArray()}></ProgressNavigator>
        {renderContentOnProgress()}
      </ShadowBox>
      <Footer />
    </div>
  );
}

export default SignUp;
