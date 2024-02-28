import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import EditForm from "@/components/organisms/EditForm";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { isLoggedIn, validateRedirectionByLoginStatus } from "@/utils/validateByLoginStatus";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);

    const isRedirectNeeded = validateRedirectionByLoginStatus({
      statusToBlock: "Logout",
      accessToken,
    });

    if (isRedirectNeeded) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: { isLoggedIn: isLoggedIn(accessToken) },
      };
    }
  } catch {
    return { notFound: true };
  }
};

export default function reviewEdit({ isLoggedIn }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />
      <EditForm />
      <Footer />
    </>
  );
}
