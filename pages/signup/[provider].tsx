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
      <ShadowBox className="relative">
        <span className="text-20 mb-15 mt-35 font-bold text-center">회원가입</span>
        <ProgressNavigator stepArray={calculateStepArray()}></ProgressNavigator>
        {renderContentOnProgress()}
      </ShadowBox>
      <Footer />
    </div>
  );
}

export default SignUp;
