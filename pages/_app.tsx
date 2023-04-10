import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={
        "max-w-[390px] mx-auto my-auto flex-col min-h-screen bg-gray-100 flex justify-between"
      }
    >
      <Component {...pageProps} />
    </div>
  );
}
