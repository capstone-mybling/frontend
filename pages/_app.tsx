import "@/styles/globals.css";
import { cls } from "@/libs/client/utils";
import type { AppProps } from "next/app";
import { Nanum_Gothic } from "next/font/google";
import { QueryClientProvider, QueryClient } from "react-query";

const nanum = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cls(
          "mx-auto my-auto flex-col min-h-screen bg-white flex justify-between",
          nanum.className
        )}
      >
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
