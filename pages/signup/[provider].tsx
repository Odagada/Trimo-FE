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

    const userOAuthData = await axios.get(`https://trimoserver.com/login/oauth/${provider}?code=${code}`);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        userOAuthData: userOAuthData.data,
      },
    };
  } catch {
    return { notFound: true };
  }
}

function SignUp({ userOAuthData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { calculateStepArray, renderContentOnProgress } = useSignUp(userOAuthData);

  return (
    <div className="flex h-screen w-full flex-col">
      <Nav isOnlyLogo />
      <ShadowBox className="relative my-32 maxTablet:my-20 maxTablet:h-full maxTablet:w-5/6 maxTablet:px-16 maxTablet:pb-30">
        <span className="mb-8 mt-18 text-center text-16 font-bold tablet:mb-15 tablet:mt-35 tablet:text-20">
          회원가입
        </span>
        <ProgressNavigator stepArray={calculateStepArray()}></ProgressNavigator>
        {renderContentOnProgress()}
      </ShadowBox>
      <Footer />
    </div>
  );
}

export default SignUp;
