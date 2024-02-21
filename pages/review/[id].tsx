import { getReview, getSpot } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import RateStars from "@/components/atoms/RateStars";
import calcData from "@/utils/calcDate";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import noImage from "@/public/images/no_image.webp";
import Emoji from "@/components/atoms/Emoji";
import { TagWithMonth } from "@/types/client.types";
import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import GoogleMap from "@/components/organisms/GoogleMap";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    // const accessToken = getAccessTokenFromCookie(context) as string;
    const reviewId = Number(context.params?.id);

    const queryClient = new QueryClient();

    const { data: reviewData, status } = await queryClient.fetchQuery(getReview(reviewId));

    const spotId = reviewData.spotId;

    if (spotId) {
      await queryClient.prefetchQuery(getSpot(spotId));
    }

    return {
      props: { reviewId, spotId, dehydratedState: dehydrate(queryClient) },
    };
  } catch {
    return { notFound: true };
  }
};

const ReadReview = ({ reviewId, spotId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: reviewData } = useQuery(getReview(reviewId));
  const { data: spotData } = useQuery(getSpot(spotId));

  const travelDate = reviewData?.data.visitingTime ?? "";
  const createDate = reviewData?.data.createdAt ?? "";
  const imageUrlArray = reviewData?.data.imageUrls ?? [];

  const date = calcData(travelDate);
  const { dateString: createAt } = calcData(createDate);
  const reviewTag = reviewData?.data.tagValues ?? {};
  const tag: TagWithMonth[] = [date.tagMonth, ...Object.values(reviewTag)];

  return (
    <>
      <Nav />
      <div className="mb-50 select-none">
        {imageUrlArray.length !== 0 ? (
          <ImagesCarousel imageArray={imageUrlArray}></ImagesCarousel>
        ) : (
          <div className="relative bg-gray-40 h-[40vh] w-full flex items-center justify-center">
            <Image draggable={false} src={noImage} alt="" fill className="object-contain" />
          </div>
        )}
      </div>

      {/* main text area */}
      <div className="max-w-800 w-full px-4 mx-auto">
        {/* title area */}
        <h2 className="mb-12 flex gap-15 items-baseline">
          <span className="heading1">{reviewData?.data.title}</span>

          <span className="text-18 text-medium leading-15">{`by ${reviewData?.data.nickName ?? "본롸"}`}</span>
        </h2>

        {/* subTitle? */}
        <div className="flex mb-30 items-center gap-10">
          <h3 className="text-18 leading-15 text-gray-40">
            {`${spotData?.data.name} · ${date.dateString} · ${date.timeString}`}
            {reviewData?.data.tagValues?.weather && ` · ${reviewData.data.tagValues.weather}`}
          </h3>
          {reviewData?.data.stars && <RateStars number={reviewData.data.stars} />}
        </div>

        {/* text area */}
        <p className="text-18 leading-42 text-justify mb-20 whitespace-pre-wrap">{reviewData?.data.content}</p>

        {/* map area */}
        <div className="mb-73">
          <GoogleMap locationIDList={[spotData?.data.placeId!]} />
        </div>
        {/* tag and createdAt */}
        <div className="flex justify-between items-center mb-155">
          <div className="flex gap-10">
            {tag?.map((item, index) => {
              return (
                <Clickable key={index} color="white-" shape="capsule" size="small">
                  <Emoji>{item}</Emoji>
                </Clickable>
              );
            })}
          </div>
          <span className="text-16 leading-15 text-gray-40">{`작성일 : ${createAt}`}</span>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ReadReview;
