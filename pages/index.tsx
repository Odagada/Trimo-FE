import Footer from "@/components/atoms/Footer";
import MultiReviewCardSlider from "@/components/molecules/MultiReviewCardSlider";
import Nav from "@/components/molecules/NavigationBar";
import { MultiReviewData } from "@/types/server.types";
import hero_sec from "@/public/images/hero-sec.png";
import Image from "next/image";
import PortalSearchBar from "@/components/molecules/PortalSearchBar";
import { useIntersectionObserver } from "@uidotdev/usehooks";

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

export default function Landing() {
  const [ref, entry] = useIntersectionObserver();

  return (
    <>
      <Nav />

      <section className="pt-88 pb-122">
        <div className="relative w-914 h-275 mx-auto">
          <Image className="object-cover" fill src={hero_sec} alt="" />
        </div>
        <div id="heroSecSearchBar">
          <span ref={ref}></span>
          {entry?.isIntersecting || <span className="block h-63"></span>}
          <PortalSearchBar switcher={entry?.isIntersecting} />
        </div>
      </section>

      <section className="flex flex-col items-center text-center pt-48 pb-56">
        <p className="text-20 font-medium leading-36">그 여행지, 실제 후기는 어떨까?</p>
        <p className="text-28 font-bold leading-42">
          이미 다녀온 유저의 리뷰를 한곳에 모아
          <br />
          <span className="text-primary">나만의 여행 계획</span>을 세워보세요.
        </p>
      </section>

      <section className="pt-32 pb-129">
        <div className="flex flex-col gap-41">
          <MultiReviewCardSlider title="최신리뷰" align="left" reviewCards={array} />
          <MultiReviewCardSlider title="인기리뷰" align="right" reviewCards={array} />
        </div>{" "}
      </section>

      <section className="bg-gray-60 items-center text-center pt-60 pb-136">
        <div className="flex flex-col">
          <p className="text-28 font-bold leading-42 text-white">
            이미 다녀온 유저의 리뷰를 한곳에 모아
            <br />
            <span className="text-primary">나만의 여행 계획</span>을 세워보세요.
          </p>
        </div>
      </section>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
}
