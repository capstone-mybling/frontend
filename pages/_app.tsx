import "@/styles/globals.css";
import { cls } from "@/libs/client/utils";
import type { AppProps } from "next/app";
import { Nanum_Gothic } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Fragment } from "react";

const nanum = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <div
          className={cls(
            "mx-auto my-auto flex-col min-h-screen bg-white flex justify-between",
            nanum.className
          )}
        >
          <Component {...pageProps} />

        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Fragment>
    </QueryClientProvider>
  );
}
