import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={"w-full max-w-[390px] mx-auto"}>
      <Component {...pageProps} />
    </div>
  );
}
