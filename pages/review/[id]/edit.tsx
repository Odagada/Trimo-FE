import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import EditForm from "@/components/organisms/EditForm";
import { GetServerSidePropsContext } from "next";
import { validateRedirectionByLoginStatus } from "@/utils/validateByLoginStatus";
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
        props: {},
      };
    }
  } catch {
    return { notFound: true };
  }
};

export default function reviewEdit() {
  return (
    <>
      <Nav />
      <EditForm />
      <Footer />
    </>
  );
}
