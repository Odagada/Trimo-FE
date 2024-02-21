import ReviewList from "@/components/molecules/ReviewList";
import { MultiReviewData } from "@/types/server.types";

const data: MultiReviewData[] = [
  {
    reviewId: 1,
    title: "에버랜드",
    tagValues: { weather: "맑음" },
    nickName: "감자",
    visitingTime: "2023-01-17T12:30:00",
    images: [
      "https://offloadmedia.feverup.com/secretseoul.com/wp-content/uploads/2022/12/07212215/%EC%97%90%EB%B2%84%EB%9E%9C%EB%93%9C-1-1024x683.jpg",
    ],
    stars: 5,
  },
  {
    reviewId: 2,
    title: "에펠탑",
    tagValues: { weather: "맑음" },
    nickName: "엠마",
    visitingTime: "2023-07-17T12:30:00",
    images: [
      "https://images.unsplash.com/photo-1604175287072-b5e71423060c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stars: 5,
  },
  {
    reviewId: 3,
    title: "오사카",
    tagValues: { weather: "맑음" },
    nickName: "고로",
    visitingTime: "2023-08-17T12:30:00",
    images: [
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stars: 5,
  },
  {
    reviewId: 1,
    title: "호버랜드",
    tagValues: { weather: "맑음" },
    nickName: "감자",
    visitingTime: "2023-02-17T12:30:00",
    images: [],
    stars: 5,
  },
  {
    reviewId: 1,
    title: "패밀리랜드",
    tagValues: { weather: "맑음" },
    nickName: "감자",
    visitingTime: "2023-02-17T12:30:00",
    images: [],
    stars: 5,
  },
  {
    reviewId: 1,
    title: "어린이대공원",
    tagValues: { weather: "맑음" },
    nickName: "어린이",
    visitingTime: "2023-05-05T12:30:00",
    images: ["https://image.edaily.co.kr/images/Photo/files/NP/S/2021/03/PS21031900793.jpg"],
    stars: 5,
  },
];

export default function NoResult() {
  return (
    <div>
      <div className="mt-36 mb-109 text-center text-gray-40">
        <div>(키워드) 에 대한 검색결과가 없습니다.</div>
        <div>다른 키워드로 다시 검색해보세요.</div>
      </div>
      <div className="px-120 bg-gray-10 pt-24 pb-28">
        <div className="heading6">이런 리뷰는 어떠세요?</div>
        <div className="small-text mt-4">다른 유저들이 관심을 갖고 있는 리뷰에요.</div>
        <ReviewList data={data} />
      </div>
    </div>
  );
}
