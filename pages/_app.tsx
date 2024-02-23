import "@/styles/globals.css";
import "@/public/font/font.css";
import "@/styles/ImagesCarousel.css";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

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
      <CookiesProvider>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <Toaster containerStyle={{ fontSize: "15px", fontWeight: "600" }} />
        </HydrationBoundary>
      </CookiesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
