import { getReview, getSpot, getUser } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import RateStars from "@/components/atoms/RateStars";
import calcData from "@/utils/calcDate";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
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
  const accessToken = getAccessTokenFromCookie(context) as string;
  const reviewId = Number(context.params?.id);

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const queryClient = new QueryClient();

  const { data: reviewData } = await queryClient.fetchQuery(getReview(reviewId));

  const spotId = reviewData.spotId;
  const userId = reviewData.userId;

  if (spotId && userId) {
    await queryClient.prefetchQuery(getSpot(spotId));
    await queryClient.prefetchQuery(getUser(userId));
  }

  return {
    props: { reviewId, spotId, userId, dehydratedState: dehydrate(queryClient) },
  };
};

const ReadReview = ({ reviewId, spotId, userId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: reviewData } = useQuery(getReview(reviewId));
  const { data: spotData } = useQuery(getSpot(spotId));
  const { data: userData } = useQuery(getUser(userId));

  // const data: Review = {
  //   userId: 1,
  //   spotId: "1",
  //   date: "2019-09-01 23:19:45",
  //   content:
  //     "비는 내리는데 원래 가려던 곳은 들어가려면 1시간 넘게 줄을 서야 한다고 해서 무작정 길을 돌아다니다가 발견한 곳이다. 일본은 실내 흡연이 아직 허용되는 건지 문을 열자마자 너구리 소굴마냥 담배 연기 + 안주 굽는 화로 연기로 매캐했다. 실제로 바에 앉은 손님 셋 중 둘은 담배 피고 있었고. 그래서 다른데 찾아볼까 하다가 일단 문 열고 들어왔으니 앉았는데, 진짜 지금까지 일본 여행하면서 가장 좋았다. 진짜 찐 동네사람들만 오는 이자카야 느낌쓰. 영어 메뉴판도 준비되어있기는 하지만, 간단한 일본어 회화 정도 할 줄 알면 훨씬 재미있게 즐길 수 있는 곳이라고 생각된다. 주력 안주는 꼬치구이지만 다른 안주들도 맛있고, 아츠캉(따듯하게 데운 사케)과 레몬 사와가 개인적으로는 추천하는 주류! 크게 중요하지는 않지만, 이 가게가 <와카코와 술>이라는 일본 드라마에도 나왔다고 한다.",
  //   tag: { companion: "가족", weather: "우천" },
  //   imageUrls: [
  //     "https://lh3.googleusercontent.com/pw/ABLVV84OW647gIEza78e_npWU3dtCF_ckv-R6yPXMb6C4Z0fK0hq9RLTEPwA87ooTH7DZ6oJN-iJpu3ni9pW0cWpEGJD5fRTmWU8KwAUn7gxgMOD-Hu1RWVsgHg3QcK_B4yv3fYGlYPqVzdL8YrqLtxikLQOrR0B9uGqQq_2m0iHNFaB8VWi_Ltf55aaLc15oEy27Vx748LIhOeKUyjM2Rr1JzgNSWsw3h21mFj-nTBiC-SKxZalZRh0EXYGFz9o9wEQUO7QWj0cS5VL6tBuGaUW4WpQhMwPIbOjA5S_fvWirp6d1apdvruhDERufZ5yRIMfFpfNzZDX8S191vdzEZ9p_xJCjr7e4QRRFezGUwY93bKoV1vHktupMvr0K6HQkrg5-EkoUizV9MuwoaUDkacA1fW0DR49UxVmTUABXnhuLqtaoMM7dmdB39Jep-DpnaKLBzKXFgHNuUgtDcq6KVWf5_fu1TmlPeC49YgxfOmxJ-7Jj2YfhfTRVCbuJBA2FTtSkR2wZnyf8GeWP44Qz8D3SY5hHgDmPn--f7SpPFb_38dZDjroHknxeXdXhUWA2vLVx2Zi-OjYxOM4pVovySFthEThvtFlbt_ASYpQNvsWiXi-VczkUUXLtkPp_MlPX-XtIIPdwsVwT0SDUl4gUnWoTZjfmjGLUjfzCR4x9c7nvO0waPTUfmLWEEOv3SyE_xgRX8Y7ba8cCpOFjAUjouJrUq0D2mxr5epKJ6wLUF2sr47YttVpsKBxj8K5f0RSGQGu1wbyP8mrHwwOSo1pDkQsGOFGY0Z0alnz_a-r09Tqlkpi-n_DJr8uCdcc0sQ75XDNIaQjsuZHIjCI3USFS9Yc-6Z2vjBreSb4gJ8gh0ckgFcTL1bPaX7odnAkzaSz1EqQVjTOzJy-P4peijj0DwXfO4i18w=w2082-h2776-s-no?authuser=0",
  //     "https://lh3.googleusercontent.com/pw/ABLVV85WRFPHSFHf8CLtyY1GaECQp711zTbVOsIts1KTNQjvG5KMIp3Nt3XbsNd2WDMFUcP3KLBpDy13ZUhamWyjDe4e7drV40mTX3njpYj5qQHwU91Fh2KjFJrV237bVf8J9uagTl9XTC53K0of5k-xgUEM8B6rQjFBlVvKvewwEB9hO9aWMNtDBFxste7xs-2FUoiEY7XO0arr7yIvsZYjDzUbpwy1zkNLz_JVa8Dmxqsy23-LuQun1HmFSuLAhIW2fiHvi38ca_XgVHhkmpEl-cJqlqqeAEsOfuT0qUNIfPv2AKSZDouJngOxz5POc-h1FP3b2ktVuhqMS6z8s9ShyQAi47pHabKtnbKlMkVHRU8KHGr1ScUXNFkC0WR2fSvlvRHfNIg2NSM6WXxW1QAJw1P3fFSIq2lyTXPAxtHEFZt7tm2sutf7wUB722w96SgShOP2m06q6YDLeIzSoeislRzbvZjVhN_4fwlHQ1eRV2JywIyrK2VkHSN1G_mXhfsw9rr5pjpcRMkBw8XQikSmlV_YyLkq0erX_95FVU8qN9C_0cjMUM6OzOxdAIwbQpQVJK5Ln3QXFXS_pzLkYX29yii94TNLr_j4baRW6TYb4oCeCGRQGjOgdXDZoK-71DaocNa4oCJ01gTjWwxLVAO_4ew-OyUym8__P1hpWitkmyk6LXteKnMiYbjiXYLvksbosXNQheY-2TQysdDSKQHJ9oyZBSZ0Kb_66EKgnBzx4JaHriZ-7aDk7gdhZIvykq9JCaIE33aMdnwICY0XRIlOGLFEbsbfBiJVu-qkr0MSIm2-OXbEh5N5L9yaX89_WApMp-EenSJQNwvfIC8V87M9pP-89HONTbscHKnCFqN3SXPnX8cmug-ih0DONVAXxqyA1cTEBmZFAH_KgV6ZCl6tdFpIxA=w2082-h2776-s-no?authuser=0",
  //     "https://lh3.googleusercontent.com/pw/ABLVV86_E6Vzl5GCDY6oBSjTQBNHXfpUygErGZx8AkSAwC0XQUgkb2Xzg2Zc_PuirhjBFx8F3le_IB-5JOq4CBjB3y06CewK2fPyqUUBmx_6y0Q7Rlo5eDy5-P1zNXrMXGPupZ_5CQGmW3sLouXhTGJ99lkbkw8FHLaoGESDfukORD1RC799dSvFQgRRVWd35AmdJgL6Kt5WKdBlqarKC8ZMrCBoWEx3eEwkct-nMYRHBZEH4INJnLzIfIzGSC4HNZ_-bWJk6xtQ2wE2VTu293NwKCV7I8iJCFks_hD1VdkavK9QqBCBQiRT1tKIEVb-ObGSrJxvRHp0SA72S-wFEacKOTkAWOUfnrTFzWwKKeT7VIPua-oq4kcwDUK4CXjhGeoi13edYi-AnjSvcNUo_GjP3mHlQZfoMYf9NnvjGlAtRXihVlvHJSf5ScvILjXa3l2QilClJDz55RU4IcqatM3BEC6mB_a3C8bjZIBRNG07txeAn9WqXN1BqwHZiKsSN2S9k__oPG5gpgKj1476zqiIVd_qTlMPzFflLwXEAxhU_eb3wMPaHKA7cenrx1vBu0jYZM47XUOdgZpMOHINiRxkeYigX9NClRG-mESbYxW-sMe5qB1Pi2Ov8I7x3eqRpQ2irmQxHUKcEWm1C_ysxsMoUzFEyDUkwCsqUYMFvnh_AxISC9uBG8TjzGG6lTpabT1Bum6_0pqJG-B1XACDNMgCpDdW3M8VJ4BVgv64NU7Vmd61qjdE-QmgGrlp-AzAFmb2OXHNVdVUrf1AWPIGZxihO8-lBayYDKSRQJrPDxryomuU7WHlM6GqGznCX8ZXe8oHJ3I07sqo0MW23X84HVbOh64ZkM9V739yli_i5yQgrpL2Zmufr6zxiBaUmYCgifn85GuYFAzXpuLVO5YONputmIsaQA=w3702-h2776-s-no?authuser=0",
  //   ],
  //   title: "진짜 일본 이자카야 느낌",
  //   stars: 2.5,
  //   updatedAt: "2019-09-01 23:19:45",
  //   createdAt: "2019-09-01 23:19:45",
  // };
  // const reviewData = { data };
  // const userData = { data: { nickName: "본롸" } };

  // const spotData = { data: { name: "보루가", placeId: "ChIJLREe-daMGGARptcB4hO92JQ" } };

  const travelDate = reviewData?.data.date ?? "";
  const createDate = reviewData?.data.createdAt ?? "";
  const modifieDate = reviewData?.data.modifiedAt ?? "";
  const imageUrlArray = reviewData?.data.imageUrls ?? [];

  const date = calcData(travelDate);
  const { dateString: createAt } = calcData(createDate);
  // const { dateString: modifiedAt } = calcData(modifieDate);
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
            <Image src={noImage} alt="" fill className="object-contain" />
          </div>
        )}
      </div>

      {/* main text area */}
      <div className="max-w-800 w-full px-4 mx-auto">
        {/* title area */}
        <h2 className="mb-12 flex gap-15 items-baseline">
          <span className="heading1">{reviewData?.data.title}</span>

          <span className="text-18 text-medium leading-15">{`by ${userData?.data.nickName}`}</span>
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
          <GoogleMap locationQuery={spotData?.data.name} />
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
