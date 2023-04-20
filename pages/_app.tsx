import "@/styles/globals.css";
import { cls } from "@/libs/client/utils";
import type { AppProps } from "next/app";
import {Nanum_Gothic} from 'next/font/google'

const nanum = Nanum_Gothic({subsets: ['latin'], weight:"400"})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={
        cls("mx-auto my-auto flex-col min-h-screen bg-white flex justify-between", nanum.className)
      }
    >
      <Component {...pageProps} />
    </div>
  );
}
