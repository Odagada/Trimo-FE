import { useIntersectionObserver, useWindowSize } from "@uidotdev/usehooks";
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
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getReviewCardArray } from "@/apis/capsulesQuery";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getReviewCardArray("POPULAR"));
    await queryClient.prefetchQuery(getReviewCardArray("RECENT"));

    return {
      props: { dehydratedState: dehydrate(queryClient) },
    };
  } catch {
    return { notFound: true };
  }
};

export default function Landing() {
  return (
    <>
      <Nav />

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
  const { width } = useWindowSize();

  return (
    <section className="px-24 pb-56 pt-36 laptop:pb-130 laptop:pt-88 tablet:px-100 tablet:pb-68 tablet:pt-72">
      <div className="relative mx-auto aspect-[914/275] max-w-914">
        <Image className="object-cover" draggable={false} fill src={hero_sec} alt="" />
      </div>
      <div id="heroSecSearchBar" className="mt-23 laptop:mt-55 tablet:mt-32">
        <span ref={ref}></span>
        <PortalSearchBar switcher={width! <= 865 || entry?.isIntersecting}>
          <SearchBar size={width! <= 768 || entry?.isIntersecting ? "large" : "small"} />
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
      <section
        className="flex flex-col items-center gap-8 bg-gray-10 py-20 text-center laptop:pb-60 laptop:pt-40 tablet:pb-40 tablet:pt-36"
        id="cardSection"
      >
        <p className="text-12 leading-18 text-gray-50 laptop:text-16 laptop:leading-24 tablet:text-14 tablet:leading-21">
          그 여행지, 실제 후기는 어떨까?
        </p>
        <p className="text-16 font-bold leading-24 laptop:text-24 laptop:leading-36 tablet:text-20 tablet:leading-30">
          실시간으로 올라오는 유저의 리뷰를 참고해
          <br />
          <span className="text-primary">나만의 여행 계획</span>을 세워보세요.
        </p>
      </section>

      <section className="bg-gray-10 pb-46">
        <div className="flex flex-col gap-24 laptop:gap-48 tablet:gap-32">
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
    "top-0 animate-marquee whitespace-nowrap",
    "absolute top-0 animate-marquee2 whitespace-nowrap",
  ];

  return (
    <section className="bg-gray-60 py-20 text-center laptop:pb-89 laptop:pt-63 tablet:py-36">
      <div className="mb-20 flex flex-col gap-8 laptop:mb-60 tablet:mb-36">
        <p className="text-12 leading-18 text-white laptop:text-16 laptop:leading-24 tablet:text-14 tablet:leading-21">
          태그 검색
        </p>
        <p className="text-16 font-bold leading-24 text-white laptop:text-24 laptop:leading-36 tablet:text-20 tablet:leading-30">
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
                    className="tablet:text-22 tablet:leading-33 ml-8 laptop:ml-18 laptop:px-26 laptop:py-9 laptop:text-28 laptop:leading-42 tablet:ml-16 tablet:px-20 tablet:py-8"
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
  const { width } = useWindowSize();

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
      <div className="tablet:gap:0 flex flex-col gap-24 tablet:flex-row tablet:items-center">
        <div className="relative h-292 w-full overflow-hidden laptop:h-584 tablet:w-1/2">
          <Image
            className="absolute right-0 mr-34 max-w-411 laptop:min-w-822 tablet:mr-16"
            src={desktopScreenShot1}
            alt=""
            width={width! >= 768 ? 822 : 411}
          />
        </div>

        <div className="ml-48 flex h-fit w-[calc(100%-48px)] flex-col gap-12 rounded-l-full bg-white py-44 pl-76 shadow-main laptop:gap-24 laptop:pb-109 laptop:pl-152 laptop:pt-128 tablet:ml-80 tablet:w-1/2 tablet:gap-16 tablet:py-48 tablet:pl-64">
          <div>
            <p className="text-12 font-medium leading-18 laptop:text-16 laptop:leading-24 tablet:text-14 tablet:leading-21">
              마이 페이지
            </p>
            <p className="text-16 font-bold leading-24 laptop:text-24 laptop:leading-36 tablet:text-18 tablet:leading-27">
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

      <div className="tablet:gap:0 flex  flex-col-reverse gap-24  tablet:flex-row tablet:items-center">
        <div className="mr-48 flex h-fit w-[calc(100%-48px)] flex-col items-end gap-12 rounded-r-full bg-white py-44 pr-76 text-right shadow-main laptop:gap-24 laptop:pb-109 laptop:pr-152 laptop:pt-128 tablet:mr-80 tablet:w-1/2 tablet:gap-16 tablet:py-48 tablet:pr-64">
          <div>
            <p className="text-12 font-medium leading-18 laptop:text-16 laptop:leading-24 tablet:text-14 tablet:leading-21">
              리뷰
            </p>
            <p className="text-16 font-bold leading-24 laptop:text-24 laptop:leading-36 tablet:text-18 tablet:leading-27">
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

        <div className="relative h-292 w-full  overflow-hidden laptop:h-584 tablet:w-1/2">
          <Image
            className="absolute left-0 ml-34 max-w-411 laptop:min-w-822 tablet:ml-16"
            src={desktopScreenShot2}
            alt=""
            width={width! >= 768 ? 822 : 411}
          />
        </div>
      </div>
    </section>
  );
};

const DeviceSection = () => {
  return (
    <section className="bg-gray-10 pb-52">
      <div className="mx-auto flex w-320 flex-col gap-12 laptop:w-1038 tablet:w-720">
        <h3 className="leading-16 inline w-fit rounded-100 bg-white px-8 py-3 text-11 font-bold shadow-main tablet:px-15 tablet:py-8 tablet:text-18 tablet:leading-27">
          디바이스 지원
        </h3>

        <div className="flex flex-wrap gap-8 laptop:gap-24 tablet:gap-21">
          <div className="order-2 h-194 w-156 overflow-hidden rounded-10 bg-gray-60 laptop:h-430 laptop:w-330 laptop:rounded-30 tablet:order-1 tablet:h-295 tablet:w-226 tablet:rounded-20 ">
            <p className="p-13 text-right text-12 leading-18 text-gray-30 laptop:p-24 tablet:p-16">Mobile</p>
            <Image
              className="mx-auto w-114 laptop:mt-33 laptop:w-237 tablet:mt-16 tablet:w-160"
              src={mobile}
              alt=""
              width={237}
            />
          </div>

          <div className="order-1 flex h-148 w-320 flex-row-reverse justify-between overflow-hidden rounded-10 bg-gray-60 p-13 laptop:h-430 laptop:w-330 laptop:rounded-30 laptop:p-24 tablet:order-2 tablet:h-295 tablet:w-226 tablet:flex-col tablet:rounded-20 tablet:p-16">
            <p className="text-right text-18 font-bold leading-27 text-white laptop:text-24 laptop:leading-36">
              언제 어디서나
              <br />
              <span className="text-primary">간편하게</span>
              <br />
              작성할 수 있어요
            </p>
            <div className="flex size-56 items-center justify-center self-end rounded-100 bg-primary laptop:size-120 tablet:size-84 tablet:self-start ">
              <Image className="w-21 laptop:w-47 tablet:w-32" src={quill} alt="" width={47} height={45} />
            </div>
          </div>

          <div className="order-3 h-194 w-156 overflow-hidden rounded-10 bg-gray-60 laptop:h-430 laptop:w-330 laptop:rounded-30 tablet:h-295 tablet:w-226 tablet:rounded-20 ">
            <p className="p-13 text-right text-12 leading-18 text-gray-30 laptop:p-24 tablet:p-16">Desktop</p>
            <Image
              className="ml-42 mt-21 w-114 laptop:ml-61 laptop:mt-84 laptop:w-270 tablet:mt-55 tablet:w-184"
              src={desktop}
              alt=""
              width={270}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const RightNowSection = () => {
  return (
    <section className="flex flex-col items-center gap-12 bg-gray-60 py-52 laptop:gap-24 laptop:py-92">
      <p className="tablet:text-21 text-center text-18 font-bold leading-27 text-white laptop:text-28 laptop:leading-42 tablet:leading-30">
        쉽고 간편한 여행 리뷰,
        <br />
        지금 바로 작성해보세요!
      </p>

      <Link href="/review">
        <Clickable
          className="w-max px-12 py-5 text-12 leading-21 laptop:px-20 laptop:py-12 tablet:py-8"
          color="primary"
          shape="square"
          size="medium"
        >
          리뷰 작성하기
        </Clickable>
      </Link>
    </section>
  );
};
