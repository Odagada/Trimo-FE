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

      <section>
        <div className="flex flex-col gap-41">
          <MultiReviewCardSlider title="최신리뷰" align="left" reviewCards={array} />
          <MultiReviewCardSlider title="인기리뷰" align="right" reviewCards={array} />
        </div>{" "}
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
