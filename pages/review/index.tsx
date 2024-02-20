import Nav from "@/components/molecules/NavigationBar";
import PlaceForm from "@/components/organisms/PlaceForm";
import Footer from "@/components/atoms/Footer";
import useRedirectBasedOnLoginStatus from "@/hooks/useRedirectBasedOnLoginStatus";

export default function ReviewWrite() {
  useRedirectBasedOnLoginStatus();
  return (
    <>
      <Nav />
      <PlaceForm />
      <Footer />
    </>
  );
}
