import Nav from "@/components/molecules/NavigationBar";
import PlaceForm from "@/components/organisms/PlaceForm";
import Footer from "@/components/atoms/Footer";
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

export default function ReviewWrite({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useRedirectBasedOnLoginStatus({
    statusToBlock: "Logout",
    accessToken,
    redirectUri: "/login",
  });

  return (
    <>
      <Nav />
      <PlaceForm />
      <Footer />
    </>
  );
}
