import { getSearchReview } from "@/apis/capsulesQuery";
import Footer from "@/components/atoms/Footer";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchContent from "@/components/organisms/SearchContent";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { isLoggedIn } from "@/utils/validateByLoginStatus";
import { QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);
    const queryClient = new QueryClient();
    const convertQuery = new URLSearchParams(context.query as any).toString();
    await queryClient.prefetchQuery(getSearchReview(convertQuery));

    return {
      props: { isLoggedIn: isLoggedIn(accessToken), query: convertQuery },
    };
  } catch {
    return { notFound: true };
  }
};

export default function Search({ isLoggedIn, query }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <SearchContent queryStr={query} />
      </div>
      <Footer />
    </div>
  );
}
