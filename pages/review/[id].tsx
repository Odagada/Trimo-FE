import fetcher from "@/apis/axios";
import { Review } from "@/types/server.types";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { QueryClient, dehydrate } from "@tanstack/react-query";
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

  const id = context.params?.id;

  const queryClient = new QueryClient();

  const { data: reviewData } = await queryClient.fetchQuery({
    queryKey: ["review", id],
    queryFn: () => fetcher<Review>({ method: "get", url: `/review/${id}` }),
  });

  if (reviewData.spot_id) {
    await queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: () => fetcher<Review>({ method: "get", url: `/review/${id}` }),
    });
  }

  return {
    props: { accessToken, dehydratedState: dehydrate(queryClient) },
  };
};

const readReview = ({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {};
