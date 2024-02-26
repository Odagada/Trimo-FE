import Nav from "@/components/molecules/NavigationBar";
import PlaceForm from "@/components/organisms/PlaceForm";
import Footer from "@/components/atoms/Footer";
import { GetServerSidePropsContext } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { validateRedirectionByLoginStatus } from "@/utils/validateByLoginStatus";

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
      <PlaceForm />
      <Footer />
    </>
  );
}
