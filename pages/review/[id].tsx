import { getReview, getReviewIsLiked, getReviewLikeCount, getUserInfo } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import MultiStarRate from "@/components/atoms/MultiStarRate";
import { QueryClient, dehydrate, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useDestructureReviewData, useIsMine, useReviewId } from "@/hooks/useDestructureReviewData";
import useAccessToken from "@/zustands/useAccessToken";
import { useEffect, useState } from "react";
import makeToast from "@/utils/makeToast";
import { useRouter } from "next/router";
import Modal from "@/components/molecules/Modal";
import fetcher from "@/apis/axios";

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
      <section className="mx-auto w-full max-w-800 px-20">
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
  const reviewId = useReviewId();

  const router = useRouter();

  const { accessToken } = useAccessToken();

  const isMine = useIsMine(accessToken);

  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const queryClient = useQueryClient();

  const uploadPostMutation = useMutation({
    mutationFn: () => {
      return fetcher({
        method: "delete",
        url: `/user/reviews/${reviewId}`,
        headers: { Authorization: `bearer ${accessToken}` },
      });
    },
    onSuccess: () => {
      handleModalToggle();
      queryClient.invalidateQueries({ queryKey: ["review"] });
      makeToast("삭제가 완료되었습니다!");
      router.push("/");
    },
  });

  return (
    <>
      {/* title area */}
      <h2 className="mb-4 flex justify-between tablet:mb-12">
        <div className="flex items-baseline gap-8 tablet:gap-20">
          <span className="tablet:heading1 text-24 font-bold leading-36">{reviewData?.data.title}</span>

          <span className="text-medium text-12 leading-15 tablet:text-18">{`by ${reviewData?.data.nickName}`}</span>
        </div>

        <div className="flex items-center gap-5">
          {!isMine && (
            <button type="button">
              <Image src={Heart} alt="좋아요" width={24} />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`https://www.trimo.kr/review/${reviewId}`);
              makeToast("링크가 복사되었습니다!");
            }}
          >
            <Image src={Message} alt="리뷰 공유" width={24} />
          </button>

          {isMine && (
            <>
              <button type="button" onClick={() => router.push(`/review/${reviewId}/edit`)}>
                <Image src={Pen} alt="리뷰 수정" width={24} />
              </button>

              <button type="button" onClick={handleModalToggle}>
                <Image src={Bin} alt="리뷰 삭제" width={24} />
              </button>

              <Modal
                isOpen={isOpen}
                title="삭제하기"
                description="이 게시글을 삭제하시겠습니까?"
                buttonText={["확인", "취소"]}
                onClose={handleModalToggle}
                onClick={uploadPostMutation.mutate}
              ></Modal>
            </>
          )}
        </div>
      </h2>

      {/* subTitle? */}
      <div className="mb-30 flex flex-col gap-10 tablet:flex-row tablet:items-center">
        <h3 className="text-12 leading-18 text-gray-40 tablet:text-18 tablet:leading-27 ">
          {`${reviewData?.data.spotName} · ${dateString} · ${timeString}`}
          {reviewData?.data.tagValues?.weather && ` · ${reviewData.data.tagValues.weather}`}
        </h3>
        {reviewData?.data.stars ? <MultiStarRate number={reviewData.data.stars} /> : ""}
      </div>

      {/* text area */}
      <p className="mb-20 whitespace-pre-wrap text-justify text-16 leading-30 tablet:text-18 tablet:leading-42">
        {reviewData?.data.content}
      </p>
    </>
  );
};

const MapNTag = () => {
  const { tag, placeId, createdAt } = useDestructureReviewData();

  return (
    <>
      {/* map area */}
      <div className="mb-12 tablet:mb-73">
        <GoogleMap locationIDList={[placeId]} />
      </div>
      {/* tag and createdAt */}
      <section className="mb-155 flex flex-col justify-between gap-24 tablet:flex-row tablet:items-center">
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
