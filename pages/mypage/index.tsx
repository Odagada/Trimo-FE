import { getFilteredMyPlaces, getMyPlaces } from "@/apis/capsulesQuery";
import Nav from "@/components/molecules/NavigationBar";
import GoogleMap from "@/components/organisms/GoogleMap";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import MyReviewGridLayout from "@/components/organisms/MyReviewGridLayout";
import Clickable from "@/components/atoms/Clickable";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const queryClient = new QueryClient();

    const accessToken = getAccessTokenFromCookie(context) ?? "";
    await queryClient.prefetchQuery(getMyPlaces(accessToken));
    await queryClient.prefetchQuery(getFilteredMyPlaces(accessToken, "page=1&size=6"));
    await queryClient.prefetchQuery(getFilteredMyPlaces(accessToken, "page=1&size=4"));

    return {
      props: { dehydratedState: dehydrate(queryClient) },
    };
  } catch {
    return { notFound: true };
  }
};

function MyPage() {
  const { userAccessToken } = useManageUserAccessToken();

  const { data: placeIds } = useQuery(getMyPlaces(userAccessToken));

  return (
    <div className="my-25 flex h-screen w-full flex-col justify-center maxDesktop:my-0 maxDesktop:h-full">
      <Nav />
      {placeIds?.data.placeIds.length! > 0 ? (
        <main className="maxDesktop:flex-start flex flex-col-reverse items-center justify-center gap-25 pb-100 desktop:mt-0 desktop:flex-row">
          <MyReviewGridLayout placeIds={placeIds?.data.placeIds ?? []} />
          <section className="mt-63 maxDesktop:mt-10">
            <GoogleMap
              locationIDList={placeIds?.data.placeIds ?? []}
              size="maxDesktop:w-560 maxDesktop:h-390 maxTablet:w-320 maxTablet:h-200 w-600 h-660"
            />
          </section>
        </main>
      ) : (
        <NoReviews />
      )}
    </div>
  );
}

export default MyPage;

export const NoReviews = () => {
  return (
    <main className="-mt-80 flex h-screen flex-col items-center justify-center gap-5 tablet:gap-30">
      <h1 className="text-20 font-bold tablet:text-[40px]">작성된 리뷰가 없습니다. 😭</h1>
      <h3 className="tablet:text-20"> 여행 리뷰를 작성하고 공유 해 보세요 ! </h3>
      <Link className="mt-20 w-280 px-22 tablet:mt-10 tablet:w-500" href="/">
        <Clickable size="large" color="black">
          메인으로
        </Clickable>
      </Link>
    </main>
  );
};
