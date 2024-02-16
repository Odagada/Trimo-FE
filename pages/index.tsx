import Footer from "@/components/atoms/Footer";
import MultiReviewCardSlider from "@/components/molecules/MultiReviewCardSlider";
import Nav from "@/components/molecules/NavigationBar";
import { MultiReviewData } from "@/types/server.types";
import hero_sec from "@/public/images/hero-sec.png";
import Image from "next/image";
import PortalSearchBar from "@/components/molecules/PortalSearchBar";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { TagWithMonth } from "@/types/client.types";
import Clickable from "@/components/atoms/Clickable";
import Emoji from "@/components/atoms/Emoji";
import SearchBar from "@/components/atoms/Inputs/SearchBar";

const array: MultiReviewData[] = [
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
  {
    reviewId: 1,
    title: "제주제주제주빔",
    tagValues: {
      weather: "우천",
    },
    visitingTime: "1995-12-17T03:24:00",
    nickName: "본롸",
    stars: 4,
  },
];

const tagArray: TagWithMonth[] = [
  // "1월",
  // "2월",
  // "3월",
  // "4월",
  // "5월",
  // "6월",
  // "7월",
  // "8월",
  // "9월",
  // "10월",
  // "11월",
  // "12월",
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

export default function Landing() {
  const [ref, entry] = useIntersectionObserver();

  return (
    <>
      <Nav />

      <section className="pt-88 pb-122">
        <div className="relative w-914 h-275 mx-auto">
          <Image className="object-cover" fill src={hero_sec} alt="" />
        </div>
        <div id="heroSecSearchBar" className="h-65">
          <span ref={ref}></span>
          <PortalSearchBar switcher={entry?.isIntersecting}>
            <SearchBar size={entry?.isIntersecting ? "large" : "small"} />
          </PortalSearchBar>
        </div>
      </section>

      <section className="flex flex-col items-center text-center pt-48 pb-72 gap-8 bg-gray-10">
        <p className="text-16 font-medium leading-36">그 여행지, 실제 후기는 어떨까?</p>
        <p className="text-28 font-bold leading-42">
          이미 다녀온 유저의 리뷰를 한곳에 모아
          <br />
          <span className="text-primary">나만의 여행 계획</span>을 세워보세요.
        </p>
      </section>

      <section className="pb-129 bg-gray-10">
        <div className="flex flex-col gap-41">
          <MultiReviewCardSlider title="최신리뷰" align="left" reviewCards={array} />
          <MultiReviewCardSlider title="인기리뷰" align="right" reviewCards={array} />
        </div>
      </section>

      <section className="bg-gray-60 items-center text-center pt-60 pb-78">
        <div className="flex flex-col gap-8 mb-60">
          <p className="text-16 font-medium leading-36 text-white">태그 검색</p>
          <p className="text-28 font-bold leading-42 text-white">
            이미 다녀온 유저의 리뷰를 한곳에 모아
            <br />
            <span className="text-primary">나만의 여행 계획</span>을 세워보세요.
          </p>
        </div>

        {/* 태그 계속 흘러가는 부분 */}
        <div className="relative overflow-x-hidden flex">
          {tagClassArray.map((item, index) => {
            return (
              <div className={item} key={index}>
                {tagArray.map((tag) => {
                  return (
                    <Clickable
                      className="ml-17 text-28 py-8 px-25 leading-42"
                      key={tag}
                      size="small"
                      shape="capsule"
                      color="white"
                    >
                      <Emoji>{tag}</Emoji>
                    </Clickable>
                  );
                })}
              </div>
            );
          })}
          return
        </div>
      </section>

      <section className="bg-gray-10">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </section>

      <Footer />
    </>
  );
}
