import fetcher from "@/apis/axios";
import ImagesCarousel from "@/components/atoms/ImagesCarousel";
import { Review } from "@/types/server.types";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { QueryClient, dehydrate, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const review_id = context.params?.id;

  const queryClient = new QueryClient();

  const { data: reviewData } = await queryClient.fetchQuery({
    queryKey: ["review", review_id],
    queryFn: () => fetcher<Review>({ method: "get", url: `/review/${review_id}` }),
  });

  const spot_id = reviewData.spot_id;

  if (spot_id) {
    await queryClient.prefetchQuery({
      queryKey: ["spot", spot_id],
      queryFn: () => fetcher<Review>({ method: "get", url: `/review/${spot_id}` }),
    });
  }

  return {
    props: { review_id, spot_id, dehydratedState: dehydrate(queryClient) },
  };
};

const ReadReview = ({ review_id, spot_id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: reviewData } = useQuery({
    queryKey: ["review", spot_id],
    queryFn: () => fetcher<Review>({ method: "get", url: `/review/${review_id}` }),
  });

  const { data: spotData } = useQuery({
    queryKey: ["review", spot_id],
    queryFn: () => fetcher<Review>({ method: "get", url: `/review/${spot_id}` }),
  });

  return (
    <>
      {reviewData?.data.imageUrls ? <ImagesCarousel imageArray={reviewData.data.imageUrls}></ImagesCarousel> : "a"}

      <p>{reviewData?.data.description}</p>
    </>
  );
};

export default ReadReview;
