import Nav from "@/components/molecules/NavigationBar";
import PlaceForm from "@/components/organisms/PlaceForm";
import Footer from "@/components/atoms/Footer";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { isLoggedIn, redirectByLoginStatus } from "@/utils/validateByLoginStatus";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);

    redirectByLoginStatus({
      statusToBlock: "Logout",
      redirectUri: "/search?searchValue=order=POPULAR",
      accessToken,
    });

    return {
      props: { isLoggedIn: isLoggedIn(accessToken) },
    };
  } catch {
    return { notFound: true };
  }
};

export default function ReviewWrite({ isLoggedIn }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />
      <PlaceForm />
      <Footer />
    </>
  );
}
