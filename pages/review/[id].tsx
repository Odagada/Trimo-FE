import { getReview, getReviewIsLiked, getReviewLikeCount, getUserInfo } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import MultiStarRate from "@/components/atoms/MultiStarRate";
import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import noImage from "@/public/images/no_image.webp";
import Emoji from "@/components/atoms/Emoji";
import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import GoogleMap from "@/components/organisms/GoogleMap";
import Bin from "@/public/icons/reviewControlIcon_Bin.svg";
import Heart from "@/public/icons/reviewControlIcon_Heart.svg";
import Message from "@/public/icons/reviewControlIcon_Message.svg";
import Pen from "@/public/icons/reviewControlIcon_Pen.svg";

import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { useDestructureReviewData, useIsMine } from "@/hooks/useDestructureReviewData";
import useAccessToken from "@/zustands/useAccessToken";
import { useEffect } from "react";

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
  const { setAccessToken } = useAccessToken();

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <>
      <Nav />
      <ImageCarouselSection />

      {/* main text area */}
      <section className="mx-auto w-full max-w-800 px-4">
        <MainReviewSection />

        {/* map area */}
        <MapNTag />
      </section>

      <Footer />
    </>
  );
}

const ImageCarouselSection = () => {
  const { imageUrlArray } = useDestructureReviewData();

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

const MainReviewSection = () => {
  const { reviewData, dateString, timeString } = useDestructureReviewData();

  const { accessToken } = useAccessToken();

  const isMine = useIsMine(accessToken);

  const queryClient = useQueryClient();

  return (
    <>
      {/* title area */}
      <h2 className="mb-12 flex items-baseline justify-between gap-15">
        <div className="flex items-baseline gap-20">
          <span className="heading1">{reviewData?.data.title}</span>

          <span className="text-medium text-18 leading-15">{`by ${reviewData?.data.nickName}`}</span>
        </div>

        <div className="flex gap-5">
          {!isMine && (
            <button type="button">
              <Image src={Heart} alt="좋아요" />
            </button>
          )}

          <button type="button">
            <Image src={Message} alt="리뷰 공유" />
          </button>

          {isMine && (
            <>
              <button type="button">
                <Image src={Pen} alt="리뷰 수정" />
              </button>

              <button type="button">
                <Image src={Bin} alt="리뷰 삭제" />
              </button>
            </>
          )}
        </div>
      </h2>

      {/* subTitle? */}
      <div className="mb-30 flex items-center gap-10">
        <h3 className="text-18 leading-15 text-gray-40">
          {`${reviewData?.data.spotName} · ${dateString} · ${timeString}`}
          {reviewData?.data.tagValues?.weather && ` · ${reviewData.data.tagValues.weather}`}
        </h3>
        {reviewData?.data.stars && <MultiStarRate number={reviewData.data.stars} />}
      </div>

      {/* text area */}
      <p className="mb-20 whitespace-pre-wrap text-justify text-18 leading-42">{reviewData?.data.content}</p>
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
