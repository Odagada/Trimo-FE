import Nav from "@/components/molecules/NavigationBar";
import WriteForm from "@/components/organisms/WriteForm";
import Footer from "@/components/atoms/Footer";
import { GetServerSidePropsContext } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { validateRedirectionByLoginStatus } from "@/utils/validateByLoginStatus";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = getAccessTokenFromCookie(context);

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
        props: {},
      };
    }
  } catch {
    return { notFound: true };
  }
};

export default function ReviewWrite() {
  return (
    <>
      <Nav />
      <WriteForm />
      <Footer />
    </>
  );
}
