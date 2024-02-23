import Footer from "@/components/atoms/Footer";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchContent from "@/components/organisms/SearchContent";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { isLoggedIn } from "@/utils/validateByLoginStatus";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);

    return {
      props: { isLoggedIn: isLoggedIn(accessToken) },
    };
  } catch {
    return { notFound: true };
  }
};

export default function Search({ isLoggedIn }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Nav isLoggedIn={isLoggedIn} />
        <div className="pt-23 pb-15">
          <SearchBar size="small" />
        </div>
        <div className="mt-15 flex justify-center">
          <div className="w-460 flex justify-end">
            <FilterDropdown />
          </div>
        </div>
        <SearchContent />
      </div>
      <Footer />
    </div>
  );
}
