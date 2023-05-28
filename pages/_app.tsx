import "@/styles/globals.css";
import { cls } from "@/libs/client/utils";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Fragment } from "react";
import { Nanum_Gothic } from "next/font/google";

const nanum = Nanum_Gothic({
  preload: false,
  weight: ["400", "700", "800"],
  style: ["normal"],
});
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <div
          className={cls(
            "flex flex-col min-h-screen bg-white",
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
