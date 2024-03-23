import { getReview, getReviewIsLiked, getReviewLikeCount, getUserInfo } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import MultiStarRate from "@/components/atoms/MultiStarRate";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import noImage from "@/public/images/no_image.webp";
import Emoji from "@/components/atoms/Emoji";
import Footer from "@/components/atoms/Footer";
import Nav from "@/components/molecules/NavigationBar";
import GoogleMap from "@/components/organisms/GoogleMap";
import Bin from "@/public/icons/reviewControlIcon_Bin.svg";

import EmptyHeart from "@/public/icons/reviewControlIcon_HeartEmpty.svg";
import FullHeart from "@/public/icons/reviewControlIcon_HeartFull.svg";
import DisabledHeart from "@/public/icons/reviewControlIcon_HeartDisabled.svg";

import Message from "@/public/icons/reviewControlIcon_Message.svg";
import Pen from "@/public/icons/reviewControlIcon_Pen.svg";

import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { useDestructureReviewData } from "@/hooks/review/useDestructureReviewData";
import Modal from "@/components/molecules/Modal";
import useReviewTimes from "@/hooks/review/useReviewTimes";
import { useReveiwIsMine } from "@/hooks/review/useReviewIsMine";
import useReviewTags from "@/hooks/review/useReviewTags";
import useHandleReview from "@/hooks/review/useHandleReview";
import useLocalToggle from "@/hooks/useLocalToggle";
import useReviewIsLiked from "@/hooks/review/useReviewIsLiked";
import useReviewLikeCount from "@/hooks/review/useReviewLikeCount";
import useAccessTokenStore from "@/zustands/useAccessTokenStore";
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
  const { setAccessToken } = useAccessTokenStore();

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <>
      <Nav />
      <ImageCarouselSection />

      <section className="mx-auto w-full max-w-800 px-20">
        <Title />

        <SubTitle />

        <Content />

        <ReviewMap />

        <Tags />
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
          <Image draggable={false} src={noImage} alt="" loading="eager" fill className="object-contain" />
        </div>
      )}
    </section>
  );
};

const Title = () => {
  const { title, nickName } = useDestructureReviewData();

  return (
    <>
      {/* title area */}
      <h2 className="mb-4 flex items-baseline justify-between gap-8 tablet:mb-12">
        <div className="flex items-baseline gap-8 tablet:gap-12">
          <span className="flex-auto break-keep text-24 font-bold leading-36 tracking-tight tablet:text-36 tablet:leading-36">
            {title}
          </span>

          <span className="text-medium shrink-0 text-12 leading-15 tablet:text-18">{`by ${nickName}`}</span>
        </div>

        <TitleButtons />
      </h2>
    </>
  );
};

const TitleButtons = () => {
  const { isOpen, handleToggleOpen } = useLocalToggle();

  const { deleteReviewMutation, likeReviewMutation, handleClipboard, handleReviewEdit } = useHandleReview();

  const isLiked = useReviewIsLiked();
  const isMine = useReveiwIsMine();
  // const isLogin = useIsLogin();

  const { accessToken } = useAccessTokenStore();

  return (
    <div className="flex items-end gap-5">
      {!isMine && (
        <button type="button" disabled={!accessToken} onClick={() => likeReviewMutation.mutate(isLiked)}>
          <Image src={accessToken ? (isLiked ? FullHeart : EmptyHeart) : DisabledHeart} alt="좋아요" width={24} />
        </button>
      )}

      <button type="button" onClick={handleClipboard}>
        <Image src={Message} alt="리뷰 공유" width={24} />
      </button>

      {isMine && (
        <>
          <button type="button" onClick={handleReviewEdit}>
            <Image src={Pen} alt="리뷰 수정" width={24} />
          </button>

          <button type="button" onClick={handleToggleOpen}>
            <Image src={Bin} alt="리뷰 삭제" width={24} />
          </button>

          <Modal
            isOpen={isOpen}
            title="삭제하기"
            description="이 게시글을 삭제하시겠습니까?"
            buttonText={["확인", "취소"]}
            onClose={handleToggleOpen}
            onClick={deleteReviewMutation.mutate}
          ></Modal>
        </>
      )}
    </div>
  );
};

const SubTitle = () => {
  const { spotName, stars, weather } = useDestructureReviewData();
  const { dateString, timeString } = useReviewTimes();
  const likeCount = useReviewLikeCount();

  return (
    <div className="mb-30 flex flex-col gap-4 tablet:gap-8 tablet:flex-row tablet:items-center">
      <h3 className="text-12 leading-18 text-gray-40 tablet:text-18 tablet:leading-27 ">
        {`${spotName} · ${dateString} · ${timeString}`}
        {weather && ` · ${weather}`}
      </h3>
      <span className="flex gap-8">
        {stars ? <MultiStarRate number={stars} /> : ""}
        {likeCount ? (
          <span className="flex gap-4">
            <Image src={FullHeart} width={14} height={14} alt="좋아요 숫자" />
            <span className="text-12 leading-18 text-gray-40 tablet:text-18 tablet:leading-27">{likeCount}</span>
          </span>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};

const Content = () => {
  const { content } = useDestructureReviewData();

  return (
    <p className="mb-20 whitespace-pre-wrap text-justify text-16 leading-30 tablet:text-18 tablet:leading-42">
      {content}
    </p>
  );
};

const ReviewMap = () => {
  const { placeId } = useDestructureReviewData();

  return (
    <div className="mb-12 w-full tablet:mb-73">
      <GoogleMap locationIDList={[placeId]} size="w-full h-350" />
    </div>
  );
};

const Tags = () => {
  const tags = useReviewTags();
  const { createdAt } = useReviewTimes();

  return (
    <section className="mb-155 flex flex-col justify-between gap-24 tablet:flex-row tablet:items-center">
      <div className="flex gap-10">
        {tags?.map((item, index) => {
          return (
            <Clickable key={index} color="white-" shape="capsule" size="small">
              <Emoji>{item}</Emoji>
            </Clickable>
          );
        })}
      </div>
      <span className="text-16 leading-15 text-gray-40">{`작성일 : ${createdAt}`}</span>
    </section>
  );
};
