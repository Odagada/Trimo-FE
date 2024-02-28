import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import ShadowBox from "@/components/atoms/ShadowBox";
import Nav from "@/components/molecules/NavigationBar";
import useSignUp from "@/hooks/signup/useSignUp";
import Footer from "@/components/atoms/Footer";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import axios from "axios";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const { provider, code } = context.query;

    const userOAuthData = await axios.get(`https://www.trimoserver.com/login/oauth/${provider}?code=${code}`);

    return {
      props: { dehydratedState: dehydrate(queryClient), userOAuthData: userOAuthData.data },
    };
  } catch {
    return { notFound: true };
  }
}

function SignUp({ userOAuthData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { calculateStepArray, renderContentOnProgress } = useSignUp(userOAuthData);

  return (
    <div className="flex flex-col w-full h-screen">
      <Nav isOnlyLogo />
      <ShadowBox className="relative my-32 maxTablet:my-20 maxTablet:pb-30 maxTablet:w-5/6 maxTablet:px-16 maxTablet:h-full">
        <span className="tablet:text-20 text-16 tablet:mb-15 mb-8 tablet:mt-35 tablet:mt-28 mt-18 font-bold text-center">
          회원가입
        </span>
        <ProgressNavigator stepArray={calculateStepArray()}></ProgressNavigator>
        {renderContentOnProgress()}
      </ShadowBox>
      <Footer className="maxTablet:hidden" />
    </div>
  );
}

export default SignUp;
