import { getReview, getReviewIsLiked, getReviewLikeCount, getUserInfo } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import MultiStarRate from "@/components/atoms/MultiStarRate";
import calcData from "@/utils/calcDate";
import { QueryClient, dehydrate, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import noImage from "@/public/images/no_image.webp";
import Emoji from "@/components/atoms/Emoji";
import { TagWithMonth } from "@/types/client.types";
import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import GoogleMap from "@/components/organisms/GoogleMap";
import { useRouter } from "next/router";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = getAccessTokenFromCookie(context) ?? "";
    const reviewId = Number(context.params?.id);
    const queryClient = new QueryClient();

    const check404 = await queryClient.fetchQuery(getReview(reviewId));
    await queryClient.prefetchQuery(getReviewLikeCount(reviewId));

    if (accessToken) {
      await queryClient.prefetchQuery(getReviewIsLiked(accessToken, reviewId));
      await queryClient.prefetchQuery(getUserInfo(accessToken));
    }

    return {
      props: { accessToken, dehydratedState: dehydrate(queryClient) },
    };
  } catch {
    return { notFound: true };
  }
};

export default function ReadReview({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { reviewData, imageUrlArray } = useDestructureReviewData(accessToken);

  return (
    <>
      <Nav />
      <ImageCarouselSection imageUrlArray={imageUrlArray} />

      {/* main text area */}
      <section className="mx-auto w-full max-w-800 px-4">
        <ReviewTitleSection />

        {/* text area */}
        <p className="mb-20 whitespace-pre-wrap text-justify text-18 leading-42">{reviewData?.data.content}</p>

        {/* map area */}
        <MapNTag />
      </section>

      <Footer />
    </>
  );
}

const useDestructureReviewData = (accessToken: string) => {
  // reviewId 확인
  const router = useRouter();
  const { id } = router.query;
  const reviewId = Number(id);

  // 필요한 query 호출
  const { data: reviewData } = useQuery(getReview(reviewId));
  const { data: userData } = useQuery(getUserInfo(accessToken));

  const imageUrlArray = reviewData?.data.images ?? [];
  const placeId = reviewData?.data.placeId ?? "";

  const travelDate = reviewData?.data.visitingTime ?? "";
  const createDate = reviewData?.data.createdAt ?? "";

  const { tagMonth, dateString, timeString } = calcData(travelDate);
  const { dateString: createdAt } = calcData(createDate);
  const reviewTag = reviewData?.data.tagValues ?? {};
  const tag: TagWithMonth[] = [tagMonth, ...Object.values(reviewTag)];

  return { reviewData, imageUrlArray, tag, placeId, createdAt, dateString, timeString };
};

const ImageCarouselSection = ({ imageUrlArray }: { imageUrlArray: string[] }) => {
  return (
    <section className="mb-50 select-none">
      {imageUrlArray.length !== 0 ? (
        <ImagesCarousel imageArray={imageUrlArray}></ImagesCarousel>
      ) : (
        <div className="relative flex h-[40vh] w-full items-center justify-center bg-gray-40">
          <Image draggable={false} src={noImage} alt="" fill className="object-contain" />
        </div>
      )}
    </section>
  );
};

const ReviewTitleSection = () => {
  const { reviewData, dateString, timeString } = useDestructureReviewData();

  const queryClient = useQueryClient();

  return (
    <>
      {/* title area */}
      <h2 className="mb-12 flex items-baseline gap-15">
        <span className="heading1">{reviewData?.data.title}</span>

        <span className="text-medium text-18 leading-15">{`by ${reviewData?.data.nickName}`}</span>
      </h2>

      {/* subTitle? */}
      <div className="mb-30 flex items-center gap-10">
        <h3 className="text-18 leading-15 text-gray-40">
          {`${reviewData?.data.spotName} · ${dateString} · ${timeString}`}
          {reviewData?.data.tagValues?.weather && ` · ${reviewData.data.tagValues.weather}`}
        </h3>
        {reviewData?.data.stars && <MultiStarRate number={reviewData.data.stars} />}
      </div>
    </>
  );
};

const MapNTag = () => {
  const { tag, placeId, createdAt } = useDestructureReviewData();

  return (
    <>
      {/* map area */}
      <div className="mb-73">
        <GoogleMap locationIDList={[placeId]} />
      </div>
      {/* tag and createdAt */}
      <section className="mb-155 flex items-center justify-between">
        <div className="flex gap-10">
          {tag?.map((item, index) => {
            return (
              <Clickable key={index} color="white-" shape="capsule" size="small">
                <Emoji>{item}</Emoji>
              </Clickable>
            );
          })}
        </div>
        <span className="text-16 leading-15 text-gray-40">{`작성일 : ${createdAt}`}</span>
      </section>
    </>
  );
};
