import { getReview, getSpot } from "@/apis/capsulesQuery";
import Clickable from "@/components/atoms/Clickable";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import RateStars from "@/components/atoms/RateStars";
import calcData from "@/utils/calcDate";
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
  // const accessToken = getAccessTokenFromCookie(context) as string;
  const reviewId = Number(context.params?.id);

  const queryClient = new QueryClient();

  const { data: reviewData } = await queryClient.fetchQuery(getReview(reviewId));

  if (!reviewData) {
    return {
      redirect: {
        notFound: true,
      },
    };
  }

  const spotId = reviewData.spotId;

  if (spotId) {
    await queryClient.prefetchQuery(getSpot(spotId));
  }

  return {
    props: { reviewId, spotId, dehydratedState: dehydrate(queryClient) },
  };
};

const ReadReview = ({ reviewId, spotId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: reviewData } = useQuery(getReview(reviewId));
  const { data: spotData } = useQuery(getSpot(spotId));

  const travelDate = reviewData?.data.visitingTime ?? "";
  const createDate = reviewData?.data.createdAt ?? "";
  // const modifieDate = reviewData?.data.modifiedAt ?? "";
  // const imageUrlArray = reviewData?.data.imageUrls ?? [];

  const imageUrlArray: string[] = [
    "https://lh3.googleusercontent.com/pw/ABLVV84HXR_w1HBL4jvTkG4ffIV_gK-dFtNYR-T0hv5lM2qI_UtXTbbdX_ImF9ehVU3ekqcqFn_G2B2ZCYPFaE7PW_vg5bzLdZ57J_qdoW1eFh8FlrBwxayz9Z2hYqi6Khb3jPFoiw4P-CCYTI0QnjY0W8JtiKTIr4WjGoUDmuK1nP7Icv-ydIPkj3l2x-zEWTMkfZtDcuMfzKoH5iJMbC2SIapusoDLT0FfRrfRNdFpDPTs2vo5Yo_taRZM2BZ29I3DZjWCDqZ98DkFxCxENg1kdf0aW0A-5B2OaqkhR1PwsLhNoThjN1HBfJKbeaA0rOh9ProReqH447552qjeY5HYc30psrhm-uivpcNxd_1UOF6BblY4SZBEjOyXLGoVMl_CJE4d16d29IWYGr9aMYp5WIQGfWuDmSwCM28Bcn2qymdCI7z__m6u8EBYo9oV6-ctBV75U6kP9TzYvV4KKqkjX_sUQueoipoyrGgu-3L0R2bA_eXXdCo4BaI4V3YnD3rNA_8bCPAlFeckrtw0qlTygorDUQS-MatFTRnw9nYFR6pucpMItIS5EY8GvIIdylNeQLnwNoOQU9L2Yn6juzd0hJURkemO72JzXBEYNa2Z4gTTe332wI5Tei-_wEDsuFRnBJ6JxGtZKPCZoNotqdYETHYPOnAemW7Lg-vOURVas5dR5jTXmh0LvZOI_TFesavhEwwqwi7CyvaRwKL-HIMh96zNA6nX-I92np5ekaanCU1C3LJUIQnV34XU4LLf9TTquT-nb3Jkd8c72yca6yBAbrxpyo3xHnNsPHmdQlL3taW0orHWHztUVq2PxldU3y4d0mG0gnaIhaDxxx8DjHegascbPSChfpnWyCNddsaeNYQr3Ydh-A-Bvr4QvqZYWsVg_U_k4aGz5Eb-iizRjK7YKe_FRw=w2082-h2776-s-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/ABLVV84Q_tN_ps9nzYVmJ9TnLK_dME5ua1hUAWrRgTtl9qt-dXB6hMEWwpoBCqEeQF73d3EKCbuxSVmqhlJ55pK3KWUBzukRbQW2Pz03KMC9Q1sybNzFiW21d_d1rcTVz2N_q3a6FF7w7JVZ4OoDAer_-oTrP6ga4hlHXypDUzyebKto0ayATI0p6t4rrjeUXR1d0OUZnHfrJyQERIpy89WCfXO-CuQJQo9y9_1YfVhQt41Z-FE2ZYnFKkdY0pJpBBUlGnX_pF57yPlKO0CSBip490leYH_n4xVJ3AnhivIqkysEr-PEPvCXspNO65C4bqS0MHVKEk0bLRkP-XgdRU-6qvIGIlW6O0YBFCVAAtmphgCKc-ZsCyUMjFeBpRBnXgCBc9YATuK0-GlAg-eSS_oafhlreK4ds_thPritrmS3pQH9j3EH0otH67FHtw8BsiO0XWxmATTXM1KMFKR5e7MAQR6M-uYiZY-4yo6JZm_OsEbcSaUQb3e32G5VGXXli68GZevZTcrv-aEgvA9AFoLymdIbZ9RxRQg8DyLEqGnZd1b_W8kbaFB-W5rDGWC-8tR9lzIEJOAhTv0aF4TGOPGC-w_ck7k2BlG2Acl79p3EWz0tLmLc2LjzgrbF7fnmHfkoC7kcasnC4bqbPdmWYqAyWU5mr7YejXirnP1lpOFxQGBLYnc1-xwzfh1s5qcQ99GWYzIRbxB9no3X31uhmV-vnjTA7tubxMLwSWlwWem-e2c8tdiwdaSwclWHSaIoqRK4hluEPIcIth7DtxcxfbmAbaX-gTFNSZmYGUB0u49m6DD0pMZTZgZz45gZ0AYqNbDzakd0765dtYseA1581QACR14wUkvLTEPr6giXtd9rejNIOc1QtrwzknEX7_eurJlhgBIZOiaYDRqHEEN4B55xz0S0zw=w2082-h2776-s-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/ABLVV84Z1RS-9TLyDpgl-2ZDwiPX9Jj2d8krFbV5fUnPkQISSDdOD--ZJvqNpwLUHU7-btSeWx3giIwqt0PvjhtOwxANi0EagNGHnja0YCjgrsitVTVXyNmWy6Y1weey0t5T6bjfFJ1x3vEkwU5rUZNEmAsL1A5MNZrrDnIhw_OlUbyO29cXdoaiFVIp5q6AR4v9SQgIJLAkiXYySlgZAU1KC_dXHs8IG13vnXrh6aXyEQAPBqb9S5RYQy5k3a2FE0oBpMOM9oigAzc1Az22MCsDKAM2e30dQou4fW336NgtFG110fe9GfAxP9HjBId7kYa-OE1G5_HSv8FmVKl8Ew2uCyvcJ_uHCBnIqKMp_tT8GuhVN3du589soLV8fX_ciYi9ykr1cmxTtyvAFcQeLEHXSMPHU8GbTQALLCY8-sm0nma9O85daLIVG37ZYpribNY2WZNPcXEWS3O7pMDvJXxbwIUZMTTbMp2O8JYD0bLNm9n-y7txruYlkVzwbY43RqbkGX8v2Mrwy_VPL_IERtyQxD1kkJhPQyyVLjKqUz1l8i38B6Gl8ETz0_oAShW9rN8X8Mn-nFEDtFY9ynk7B_UUR03i8YU0sS-dN2CvWU4kUreXHcrF3pelvDJhYCIUMAyEy2ChrtERLCR4iBZW-K4K0q6T6H79SYEhrMapQu46e80jkCyf0_O7DUtL3yViM6IRrYdL8eySatkDvPfTxUXeUCLflXtPjYWngacRUYHaBDSxdoDTbs3tEbNr9X_TxrFnsG0boAO3c0x-OEJBf78pnyjVH6o0sEfpEgi7iIWJ5PmRQwEKkfNL_p6QONeZx8abkc8Y4CsoEnQjfCo37vHJUUi08pMoGoBF7C9Sgi5mVK5ny-I95WYdfZsJ-xBxjjhc74vjTKxteNSJWc9IrNHWpiDD=w3702-h2776-s-no?authuser=0",
  ];

  const date = calcData(travelDate);
  const { dateString: createAt } = calcData(createDate);
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

          <span className="text-18 text-medium leading-15">{`by ${reviewData?.data.nickName ?? "본롸"}`}</span>
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
          <GoogleMap locationIDList={[spotData?.data.placeId!]} />
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
