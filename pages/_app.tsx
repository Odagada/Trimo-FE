import "@/styles/globals.css";
import "@/public/font/font.css";
import "@/styles/ImagesCarousel.css";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

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
    <>
      <Head>
        <title>TRIMO</title>
        <meta name="description" content="쉽고 간편한 여행 리뷰, 지금 바로 작성해보세요!" />
        <link rel="icon" href="/logos/TRIMO.svg" />
        {/* og */}
        <meta property="og:url" content="https://www.trimo.kr/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TRIMO" />
        <meta property="og:description" content="쉽고 간편한 여행 리뷰, 지금 바로 작성해보세요!" />
        <meta property="og:image" content="https://github.com/Odagada/Trimo-FE/blob/develop/public/logos/preview.png" />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="trimo.kr" />
        <meta property="twitter:url" content="https://www.trimo.kr/" />
        <meta name="twitter:title" content="TRIMO" />
        <meta name="twitter:description" content="쉽고 간편한 여행 리뷰, 지금 바로 작성해보세요!" />
        <meta
          name="twitter:image"
          content="https://github.com/Odagada/Trimo-FE/blob/develop/public/logos/preview.png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <Toaster containerStyle={{ fontSize: "15px", fontWeight: "600" }} />
          </HydrationBoundary>
        </CookiesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
