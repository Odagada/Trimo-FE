import { getReview, getSpot, getUser } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import RateStars from "@/components/atoms/RateStars";
import { Review } from "@/types/server.types";
import calcData from "@/utils/calcDate";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import noImage from "@/public/images/no_image.webp";
import getEmoji from "@/utils/getEmoji";
import Emoji from "@/components/atoms/Emoji";
import { TagWithMonth } from "@/types/client.types";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const accessToken = getAccessTokenFromCookie(context) as string;
//   const review_id = Number(context.params?.id);

//   if (!accessToken) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/signin",
//       },
//     };
//   }

//   const queryClient = new QueryClient();

//   const { data: reviewData } = await queryClient.fetchQuery(getReview(review_id));

//   const spot_id = reviewData.spot_id;
//   const user_id = reviewData.user_id;

//   if (spot_id && user_id) {
//     await queryClient.prefetchQuery(getSpot(spot_id));
//     await queryClient.prefetchQuery(getUser(user_id));
//   }

//   return {
//     props: { review_id, spot_id, user_id, dehydratedState: dehydrate(queryClient) },
//   };
// };

// { review_id, spot_id, user_id }: InferGetServerSidePropsType<typeof getServerSideProps>

const ReadReview = () => {
  // const { data: reviewData } = useQuery(getReview(review_id));

  // const { data: spotData } = useQuery(getSpot(spot_id));

  // const { data: userData } = useQuery(getUser(user_id));

  const data: Review = {
    user_id: 1,
    review_id: 1,
    spot_id: "1",
    date: "2019-09-01 23:19:45",
    createdAt: "2019-09-01 23:19:45",
    description:
      "건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식 요리 레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리 10가지를 선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로 완벽하며 영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한 채식 칠리, 포만감을 주는 동시에 영양소를 공급합니다. 세 번째는 색다른 맛의 채식 패드타이, 고소한 땅콩 소스로 풍미를 더합니다.",
    likeUserId: [],
    tag: { companion: "가족", weather: "맑음" },
    imageUrls: [],
    title: "여기 완전 추천",
    stars: 5,
  };

  const reviewData = { data };

  const userData = { data: { nickName: "본롸" } };

  const spotData = { data: { name: "보루가" } };

  const travelDate = reviewData?.data.date ?? "";
  const createDate = reviewData?.data.createdAt ?? "";
  const imageUrlArray = reviewData?.data.imageUrls ?? [];

  const date = calcData(travelDate);
  const { dateString: createAt } = calcData(createDate);
  const reviewTag = reviewData?.data.tag ?? {};
  const tag: TagWithMonth[] = [date.tagMonth, ...Object.values(reviewTag)];

  return (
    <>
      <div className="mb-50">
        {imageUrlArray.length !== 0 ? (
          <ImagesCarousel imageArray={imageUrlArray}></ImagesCarousel>
        ) : (
          <div className="relative bg-gray-40 h-[30vh] w-full flex items-center justify-center">
            <Image src={noImage} alt="" fill className="object-contain" />
          </div>
        )}
      </div>

      {/* main text area */}
      <div className="w-800 px-4 mx-auto">
        {/* title */}
        <h2 className="mb-12">{`${reviewData?.data.title} by ${userData?.data.nickName}`}</h2>

        {/* subTitle? */}
        <div className="flex mb-30">
          <h3 className="text-18 leading-15 text-gray-40">
            {`${spotData?.data.name} · ${date.dateString} · ${date.timeString}`}
            {reviewData?.data.tag?.weather && ` · ${reviewData?.data.tag?.weather}`}
          </h3>
          {reviewData?.data.stars && <RateStars number={reviewData.data.stars} />}
        </div>

        {/* textArea */}
        <p className="text-18 leading-22 text-justify mb-20">{reviewData?.data.description}</p>

        {/* tag and createdAt */}
        <div className="flex justify-between">
          <div>
            {tag?.map((item, index) => {
              return (
                <Clickable key={index} color="white-" shape="capsule" size="small">
                  <Emoji>{item}</Emoji>
                </Clickable>
              );
            })}
          </div>
          <span>{createAt}</span>
        </div>
      </div>
    </>
  );
};

export default ReadReview;
