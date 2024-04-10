import { getSearchReview } from "@/apis/capsulesQuery";
import Footer from "@/components/atoms/Footer";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchContent from "@/components/organisms/SearchContent";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);
    const queryClient = new QueryClient();
    const convertQuery = new URLSearchParams(context.query as any).toString();
    await queryClient.prefetchQuery(getSearchReview(convertQuery));
    return { props: {} };
  } catch {
    return { notFound: true };
  }
};

export default function Search() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <Nav />
        <div className="flex-center flex pb-15 pt-23">
          <SearchBar size="small" />
        </div>
        <div className="mt-15 flex justify-center">
          <div className="flex w-460 justify-end">
            <FilterDropdown />
          </div>
        </div>
        <SearchContent />
      </div>
      <Footer />
    </div>
  );
}
