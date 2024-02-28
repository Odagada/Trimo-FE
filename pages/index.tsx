import { useIntersectionObserver } from "@uidotdev/usehooks";
import { TagWithMonth } from "@/types/client.types";
import Clickable from "@/components/atoms/Clickable";
import Footer from "@/components/atoms/Footer";
import MultiReviewCardSlider from "@/components/molecules/MultiReviewCardSlider";
import Nav from "@/components/molecules/NavigationBar";
import Emoji from "@/components/atoms/Emoji";
import PortalSearchBar from "@/components/molecules/PortalSearchBar";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import hero_sec from "@/public/images/hero-sec.png";
import quill from "@/public/icons/quill.webp";
import desktop from "@/public/images/desktopMock.png";
import mobile from "@/public/images/mobileMock.webp";
import desktopScreenShot1 from "@/public/images/DesktopScreenShot1.png";
import desktopScreenShot2 from "@/public/images/DesktopScreenShot2.png";
import Link from "next/link";
import Image from "next/image";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getReviewCardArray } from "@/apis/capsulesQuery";
import { useEffect, useState } from "react";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { isLoggedIn } from "@/utils/validateByLoginStatus";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getReviewCardArray("POPULAR"));
    await queryClient.prefetchQuery(getReviewCardArray("RECENT"));

    const accessToken = await getAccessTokenFromCookie(context);

    return {
      props: { dehydratedState: dehydrate(queryClient), isLoggedIn: isLoggedIn(accessToken) },
    };
  } catch {
    return { notFound: true };
  }
};

export default function Landing({ isLoggedIn }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />

      <HeroSection />

      <CardSection />

      <TagSection />

      <ServiceExplainSection />

      <DeviceSection />

      <RightNowSection />

      <Footer />
    </>
  );
}

const HeroSection = () => {
  const [ref, entry] = useIntersectionObserver();

  return (
    <section className="pb-122 pt-88">
      <div className="relative mx-auto h-275 w-914">
        <Image className="object-cover" draggable={false} fill src={hero_sec} alt="" />
      </div>
      <div id="heroSecSearchBar" className="h-65">
        <span ref={ref}></span>
        <PortalSearchBar switcher={entry?.isIntersecting}>
          <SearchBar size={entry?.isIntersecting ? "large" : "small"} />
        </PortalSearchBar>
      </div>
    </section>
  );
};

const CardSection = () => {
  const { data: recentData } = useQuery(getReviewCardArray("RECENT"));
  const { data: populerData } = useQuery(getReviewCardArray("POPULAR"));

  const recentReviewCardArray = recentData?.data ?? [];
  const populerReviewCardArray = populerData?.data ?? [];

  return (
    <>
      <section className="flex flex-col items-center gap-8 bg-gray-10 pb-72 pt-48 text-center" id="cardSection">
        <p className="text-16 font-medium leading-36">그 여행지, 실제 후기는 어떨까?</p>
        <p className="text-28 font-bold leading-42">
          이미 다녀온 유저의 리뷰를 한곳에 모아
          <br />
          <span className="text-primary">나만의 여행 계획</span>을 세워보세요.
        </p>
      </section>

      <section className="bg-gray-10 pb-129">
        <div className="flex flex-col gap-41">
          {recentReviewCardArray && (
            <MultiReviewCardSlider title="최신리뷰" align="left" reviewCards={recentReviewCardArray} />
          )}
          {populerReviewCardArray && (
            <MultiReviewCardSlider title="인기리뷰" align="right" reviewCards={populerReviewCardArray} />
          )}
        </div>
      </section>
    </>
  );
};

const TagSection = () => {
  const tagArray: TagWithMonth[] = [
    "맑음",
    "흐림",
    "우천",
    "눈",
    "맛집",
    "관광",
    "휴양",
    "명소",
    "가족",
    "친구",
    "연인",
    "혼자",
  ];

  const tagClassArray = [
    "top-0 py-12 animate-marquee whitespace-nowrap",
    "absolute top-0 py-12 animate-marquee2 whitespace-nowrap",
  ];

  return (
    <section className="bg-gray-60 pb-78 pt-60 text-center">
      <div className="mb-60 flex flex-col gap-8">
        <p className="text-16 font-medium leading-36 text-white">태그 검색</p>
        <p className="text-28 font-bold leading-42 text-white">
          태그를 통해 다른 유저의 여행 리뷰를
          <br />
          <span className="text-primary">쉽고 디테일</span>하게 검색할 수 있어요.
        </p>
      </div>

      {/* 태그 계속 흘러가는 부분 */}
      <div className="relative flex overflow-x-hidden">
        {tagClassArray.map((item, index) => {
          return (
            <div className={item} key={index}>
              {tagArray.map((tag) => {
                return (
                  <Clickable
                    className="ml-17 px-25 py-8 text-28 leading-42"
                    key={tag}
                    size="small"
                    shape="capsule"
                    color="white-"
                  >
                    <Emoji>{tag}</Emoji>
                  </Clickable>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ServiceExplainSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cardSection = document.getElementById("cardSection") as HTMLSpanElement;
  const cardSectionTop = cardSection.offsetTop;

  const handleClick = () => {
    scrollTo({ top: cardSectionTop, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-140 bg-gray-10 pb-176 pt-148">
      <div className="flex items-center">
        <div className="relative h-626 w-1/2 overflow-hidden">
          <Image className="absolute right-0 min-w-882" src={desktopScreenShot1} alt="" width={882} />
        </div>

        <div className="ml-80 flex h-fit w-1/2  flex-col gap-24 rounded-l-full bg-white pb-109 pl-152 pt-128 shadow-main">
          <div>
            <p className="text-16 font-medium leading-24">마이 페이지</p>
            <p className="text-24 font-bold leading-36">
              지금까지 여행의 기록들을
              <br />
              <span className="text-primary">지도</span>로 이어보세요.
            </p>
          </div>

          <Link href="/">
            <Clickable className="w-max px-20" color="primary" shape="square" size="medium">
              나의 리뷰보기
            </Clickable>
          </Link>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-80 flex h-fit w-1/2 flex-col items-end gap-24 rounded-r-full bg-white pb-109 pr-152 pt-128 text-right shadow-main">
          <div>
            <p className="text-16 font-medium leading-24">리뷰</p>
            <p className="text-24 font-bold leading-36">
              다른 유저의 <span className="text-primary">리뷰</span>를 저장하고
              <br />
              나의 여행에 참고해보세요.
            </p>
          </div>

          <button type="button" onClick={handleClick}>
            <Clickable className="w-max px-20" color="primary" shape="square" size="medium">
              리뷰 둘러보기
            </Clickable>
          </button>
        </div>

        <div className="relative h-626 w-1/2 overflow-hidden">
          <Image className="absolute left-0 min-w-882" src={desktopScreenShot2} alt="" width={882} />
        </div>
      </div>
    </section>
  );
};

const DeviceSection = () => {
  return (
    <section className="bg-gray-10 pb-52">
      <div className="mx-auto flex w-1038 flex-col gap-12">
        <h3 className={`inline w-fit rounded-100 bg-white px-15 py-8 text-18 font-bold leading-27 shadow-main`}>
          디바이스 지원
        </h3>

        <div className="flex gap-24">
          <div className="h-430 w-330 overflow-hidden rounded-30 bg-gray-60 p-24">
            <p className="text-right text-12 leading-18 text-gray-30">Mobile</p>
            <Image className="mx-auto mt-33" src={mobile} alt="" width={237} />
          </div>

          <div className="flex h-430 w-330 flex-col justify-between overflow-hidden rounded-30 bg-gray-60 p-24">
            <p className="text-right text-24 font-bold leading-36 text-white">
              언제 어디서나
              <br />
              <span className="text-primary">간편하게</span>
              <br />
              작성할 수 있어요
            </p>
            <div className="flex size-120 items-center justify-center rounded-100 bg-primary">
              <Image src={quill} alt="" width={47} height={45} />
            </div>
          </div>

          <div className="h-430 w-330 overflow-hidden rounded-30 bg-gray-60 p-24">
            <p className="text-right text-12 leading-18 text-gray-30">Desktop</p>
            <Image className="ml-61 mt-85" src={desktop} alt="" width={270} />
          </div>
        </div>
      </div>
    </section>
  );
};

const RightNowSection = () => {
  return (
    <section className="flex flex-col items-center gap-24 bg-gray-60 py-92">
      <p className="text-center text-28 font-bold leading-42 text-white">
        쉽고 간편한 여행 리뷰,
        <br />
        지금 바로 작성해보세요!
      </p>

      <Link href="/review">
        <Clickable className="w-max px-20" color="primary" shape="square" size="medium">
          리뷰 작성하기
        </Clickable>
      </Link>
    </section>
  );
};
