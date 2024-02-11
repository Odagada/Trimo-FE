import { getReview, getSpot, getUser } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import RateStars from "@/components/atoms/RateStars";
import { Review } from "@/types/server.types";
import calcData from "@/utils/calcDate";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import noImage from "@/public/images/no_image.webp";
import Emoji from "@/components/atoms/Emoji";
import { TagWithMonth } from "@/types/client.types";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const accessToken = getAccessTokenFromCookie(context) as string;
//   const review_id = Number(context.params?.id);

//   if (!accessToken) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/signin",
//       },
//     };
//   }

//   const queryClient = new QueryClient();

//   const { data: reviewData } = await queryClient.fetchQuery(getReview(review_id));

//   const spot_id = reviewData.spot_id;
//   const user_id = reviewData.user_id;

//   if (spot_id && user_id) {
//     await queryClient.prefetchQuery(getSpot(spot_id));
//     await queryClient.prefetchQuery(getUser(user_id));
//   }

//   return {
//     props: { review_id, spot_id, user_id, dehydratedState: dehydrate(queryClient) },
//   };
// };

// { review_id, spot_id, user_id }: InferGetServerSidePropsType<typeof getServerSideProps>

const ReadReview = () => {
  // const { data: reviewData } = useQuery(getReview(review_id));

  // const { data: spotData } = useQuery(getSpot(spot_id));

  // const { data: userData } = useQuery(getUser(user_id));

  const data: Review = {
    userId: 1,
    spotId: "1",
    date: "2019-09-01 23:19:45",
    content:
      "건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식 요리 레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리 10가지를 선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로 완벽하며 영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한 채식 칠리, 포만감을 주는 동시에 영양소를 공급합니다. 세 번째는 색다른 맛의 채식 패드타이, 고소한 땅콩 소스로 풍미를 더합니다.",
    tag: { companion: "가족", weather: "맑음" },
    imageUrls: [
      "https://lh3.googleusercontent.com/pw/ABLVV85MP1rVOS7jcB4P2nwkg6cBJaXuad95R7nZSCNPHNKmKccYKx6gi7AuREvAHfYKEYOMHFiyGXPt9NfzWqd4a0v8HLomlu_c6Phgu5BsBW4jC6bhEcER3iOAqMWrI5o7kmr9PmreUAHwKr0jFeePksoflK114wqEV-1ihpyL1TSvLFAg_isHG37IN-usAb_prBb5lcJOPNCl_vVModitegt1aiz2Er-M8uASGtEyJ5yBP6btdJYOzNQKiuOCTrKI4RcgUDWJYFsGCjurRKZiwYkmhgutXVXoZpu9LgcaF2r0uqDErt7JCClqP-JE9GwrLTN1HCL6ekAMzJZA_zm_PDIK783DHijDSZ0cf-zO68fYBe94MwbXckQbFuHQq4pBov3_bgjzRoe6cmTOY5_86iL6YBIVuTxvazgwvKhebSK2wS5ubR1HOeGEgeDPqLU7CKGByFomudpNpfg4cFm7wvtT65GTzcKxUsTOfBWrMeAwMNf8e8P8CVVw3GLJWdMYigc0WEjeldchSv_eUMH0LySWkAEB8MRh9W2sgJIKBXN_TYxmeOCj_3mKmJyMLK5JEbok2YPwx6HYd2g7IkxAvQhij_RL4gUrgyVAVG1eiKhiQojIih8Yl-llJRm1GfBa_rnZjXpfag0eqwfxCgWcPM0y73b7MeePd2aXNNJWLi-7SAmxJzLpIR2p2-Vsu9I517mi1RnR6JDiWN5mkmjG4ZK1zMPlYt-alUIC_y4WjyXtLDvcxH_zRpJsbJNFuq2ZrIrfY1o4lDWovjSnN6jKcKk7haO3ztANFhtW8wNdc-Tr58tfLLwKqlYGHQZJam18sUFMa2b8ysfIAFm-hcVKwM8gmpwIZjN8BWxY8xivsMvwk-iRbTrCZwEiUtcd2Y5p-OBMbdq9oR12bAMBfpLUppHKug=w2030-h2706-s-no-gm?authuser=0",
      "https://lh3.googleusercontent.com/pw/ABLVV86Zm8SML7BzG5qd-mu4KzTwcXNBg-yysedp3Hp2pUfQlAsA6F-vS0393o9nP64l-yJRlKaLKFtDCbpUZ9JuZVdbgKh0emOLZNdSbIcS2glP1XGHClsBNIg-Fn5DsQKeFz3ufXGhSeL_6eWz2tX6njSRslm5LUwDgq1lrmPtCXmT6jAb4fPQZXapfXlPRVXfgjscUKlSmAOVOqKPZOeKMzR4bS4KL4Kx6aV7-y2GQA2OM2_pur_GlGN6mYO2H9o-NRERvrfLP-5cFy0XUmth8952AZLAlogFGS6MAsIe2RLuE1BDker2X0eTvjrvwifMINJmAtZHmReZwOFeokZ0aeRXEpp9Ho-MpW_qUNj7TYuKEPR8FpmQKT0jhVfAI-t8alZVTAUVTiUAGplsLgk61pqU98Yvqqwu4wPTeofnid0jg3FzYOjf2kJdbl3V1BG3RwhxN7IG83ncqcS4oW3O0lMHFwadGwlUpnV7RrNq_evCJtkBoM9c8u_-dBhRdUiSE2sowCipt17JbrYBPv1SYGqjPlGdJMuVCsL6M8Db5b4TzNojHS5L3SUsYbOGvdAqjUSv9G4WR7bg4urwRi1Jm8wCCyNBRxJAqoFJy1kespcoEVPEPipt4kupj1VuITk9gXtI4CjQCcFIO79azVCjNkwzbXdEp00D4IvpZTPMIjzhTzxXYTztA2Em05Xtu4I6xyvatowwrdyXkZaso0DXjt7k720EuTrEfqStC4SA-ai61K4nBDUGnAJNqCnuvZVdaEcMVg4Y4PcNh3AsEH4iU1OehpIORdpuM1bfUQJkocAevKMDvhOnrw2HokAxhx7EZMNc7z6sjeN0ducxyCOZuhEe0yH4XVJqCctXkYJgnTLSQfZIbwtrgvITyCz3VjZNaZC8lATkW-OvqiOzSBYCvBnkjw=w2030-h2706-s-no-gm?authuser=0",
      "https://lh3.googleusercontent.com/pw/ABLVV85nOR4acinVOMhT_ywiosAzpDsjMGN0RUGTY2tdIx61RZEqEk6MqKNwWTQioKtFUhYT58dVWGDJkTmVb1_TT_CqZS6IrvYwzI5XqmraKERo12WC6MIHX30g79vmLDpthG2049kzz-JyOJuqt6_A0O0x2LVsknhsLMS8xCTsxKF6i8DQ1AQSbnjezvYdHJm-YYDCUxlR2eowzlqDoR0g_EH8ojCU_gd5m59_n-bddUzYFenxFNtwSjIaoxyGqGRDelUt-TwWtAbbD2PthCC3evDJDJqJaWcJH9_Bqs-19Xq44eHT-N3gWRUmdRx3J7SZMM-K5MbtlK36I-_mD_f19Mpmg1m7Pe0vxeWZtHWKySXZTCiMBHdvVm3fRB9c8VbkS1TJ8OUxqJ7z2GzOtKUjGeqB_E9LLs-4Ik7aWgdmuCtR9U1wyMXdNStJMMrIFcceXQGVS6isBBC3gDbO85XcL77EOXXgnfRAMN6rBdyb4pifz4kyK4GCgxkFmORxBKaqcbycLVcfvQYEYKms8P7zKrRmFW0FCWw2s9rNx62nNzIipxv9Cz2Qtks1nNnvWMq3DNRev_jUgAwmZcznvgmPhnyD0IGkCg6GnO6gds8FDFG8bJxfGSCrq8vbvm3Fq50pOQ6JxjTJJw76b1BNboM4r9vXyJj5siVHP69h-nmBU7nmPuTVetb3HfaZU8-48xUVW7YGxGrX4NV0JUgynkb6RRMdEkyemu4jDdgBnBLV1cjMg-k9TA6325RbYwrOl9X_waAZoGMb1scOhFi6RyLMtoSZHl7AgaqUE6YK-rPzX4TekVVtH63h_KNaMdI6u--va2SYLHMFKyqk7lHgTRok4Crz7h01gDTyOIXA2-FBqUjGY1sUzuBYM466-Qv4EZ4bPHgzFnmXfLbFitidlNJAdS__nQ=w3608-h2706-s-no-gm?authuser=0",
    ],
    title: "여기 완전 추천",
    stars: 5,
    updatedAt: "2019-09-01 23:19:45",
    createdAt: "2019-09-01 23:19:45",
  };

  const reviewData = { data };

  const userData = { data: { nickName: "본롸" } };

  const spotData = { data: { name: "보루가" } };

  const travelDate = reviewData?.data.date ?? "";
  const createDate = reviewData?.data.createdAt ?? "";
  const imageUrlArray = reviewData?.data.imageUrls ?? [];

  const date = calcData(travelDate);
  const { dateString: createAt } = calcData(createDate);
  const reviewTag = reviewData?.data.tag ?? {};
  const tag: TagWithMonth[] = [date.tagMonth, ...Object.values(reviewTag)];

  return (
    <>
      <div className="mb-50">
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
        <div className="flex mb-30">
          <h3 className="text-18 leading-15 text-gray-40">
            {`${spotData?.data.name} · ${date.dateString} · ${date.timeString}`}
            {reviewData?.data.tag?.weather && ` · ${reviewData?.data.tag?.weather}`}
          </h3>
          {reviewData?.data.stars && <RateStars number={reviewData.data.stars} />}
        </div>

        {/* text area */}
        <p className="text-18 leading-42 text-justify mb-20">{reviewData?.data.content}</p>

        {/* map area */}
        <div className="mb-73"></div>
        {/* tag and createdAt */}
        <div className="flex justify-between items-center">
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
    </>
  );
};

export default ReadReview;
