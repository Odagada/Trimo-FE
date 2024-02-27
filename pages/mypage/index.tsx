import { getMyPlaces } from "@/apis/capsulesQuery";
import Nav from "@/components/molecules/NavigationBar";
import ReviewCard from "@/components/molecules/ReviewCard";
import GoogleMap from "@/components/organisms/GoogleMap";
import useManageUserAccessToken from "@/hooks/useManageUserAccessToken";
import { useQuery } from "@tanstack/react-query";
import FilterOptionsButtons from "@/components/atoms/FilterOptionButtons";

// http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/user/me/reviews?weather=%EB%A7%91%EC%9D%8C&page=1
// http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/user/me/reviews?weather=%ED%9D%90%EB%A6%BC&month=1&page=1'
// 'http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/user/me/reviews?page=1'

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const queryClient = new QueryClient();
//     const accessToken = getAccessTokenFromCookie(context);

//     const isRedirectNeeded = validateRedirectionByLoginStatus({
//       statusToBlock: "Logout",
//       accessToken,
//     });

//     if (isRedirectNeeded) {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     } else {
//       try {
//         await queryClient.prefetchQuery(getMyPlaces(accessToken!));
//       } catch {
//         return { notFound: true };
//       }

//       return { props: { dehydratedState: dehydrate(queryClient) } };
//     }
//   } catch {
//     return { notFound: true };
//   }
// }

const placeId = ["ChIJ_TooXM3gAGARQR6hXH3QAQ8", "ChIJLREe-daMGGARptcB4hO92JQ"];

const Reviews = [
  {
    reviewId: 0,
    title: "도리포로가자",
    tagValues: {
      weather: "맑음",
    },
    nickName: "string",
    visitingTime: "2024-01-01T07:30:00",
    stars: 5,
  },
  {
    reviewId: 1,
    title: "dkdkdkdk",
    tagValues: {
      weather: "맑음",
      placeType: "명소",
    },
    nickName: "string",
    visitingTime: "2024-01-01T07:30:00",
    stars: 5,
  },
  {
    reviewId: 2,
    title: "ㅇ나라얼ㄴㄹ",
    tagValues: {
      companion: "가족",
    },
    nickName: "string",
    visitingTime: "2024-01-01T07:30:00",
    stars: 5,
  },
  {
    reviewId: 3,
    title: "아아아아아어어",
    tagValues: {
      weather: "맑음",
      placeType: "명소",
      companion: "가족",
    },
    nickName: "string",
    visitingTime: "2024-01-01T07:30:00",
    stars: 5,
  },

  // {
  //   reviewId: 0,
  //   title: "도리포로가자",
  //   tagValues: {
  //     weather: "맑음",
  //     placeType: "명소",
  //     companion: "가족",
  //   },
  //   nickName: "string",
  //   visitingTime: "2024-01-01T07:30:00",
  //   stars: 5,
  // },
  // {
  //   reviewId: 1,
  //   title: "dkdkdkdk",
  //   tagValues: {
  //     weather: "맑음",
  //     placeType: "명소",
  //   },
  //   nickName: "string",
  //   visitingTime: "2024-01-01T07:30:00",
  //   stars: 5,
  // },
];

function MyPage() {
  const { userAccessToken } = useManageUserAccessToken();
  const { data } = useQuery(getMyPlaces(userAccessToken));

  // console.log(data?.data.placeIds);

  // window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => this.setState({ matches: e.matches }))

  // /api/user/me/reviews?page=1'

  return (
    <div className="h-screen flex w-full flex-col justify-center -mt-25">
      <Nav />
      <main className="flex justify-center items-center gap-25">
        <section className="flex flex-col">
          <FilterOptionsButtons placeId={placeId} />
          <ReviewGridLayout />
        </section>
        <section className="mt-63">
          <GoogleMap locationIDList={placeId} size="w-600 h-660"></GoogleMap>
        </section>
      </main>
    </div>
  );
}

export default MyPage;

export const ReviewGridLayout = () => {
  return (
    <div className="grid  maxDesktop:grid-cols-2 grid-cols-3 grid-rows-2 w-fit gap-10 ">
      {Reviews.map((review, index) => (
        <ReviewCard review={review} key={index}></ReviewCard>
      ))}
    </div>
  );
};
