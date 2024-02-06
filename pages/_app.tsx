import "@/styles/globals.css";
import "@/public/font/font.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import ReviewCard from "@/components/molecules/ReviewCard";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
      <ReactQueryDevtools initialIsOpen={false} />
      <ReviewCard
        review={{
          reviewId: 1,
          title: "string",
          author: "여행록",
          imageUrls: [
            "https://images.unsplash.com/photo-1588438127981-fe383cf43bbd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          tag: ["맛집", "친구"],
          rate: 5,
          date: "1995-12-17T03:24:00",
          destination: "제주 애월해변",
          description: "너무 멋있는 풍경이다",
          createdAt: "1995-12-17T03:24:00",
          likeUserId: [1, 2],
        }}
      />
    </QueryClientProvider>
  );
}
