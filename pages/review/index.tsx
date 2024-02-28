import Nav from "@/components/molecules/NavigationBar";
import PlaceForm from "@/components/organisms/PlaceForm";
import Footer from "@/components/atoms/Footer";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import {
  isLoggedIn,
  validateRedirectionByLoginStatus,
} from "@/utils/validateByLoginStatus";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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

export default function ReviewWrite({
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />
      <PlaceForm />
      <Footer />
    </>
  );
}
