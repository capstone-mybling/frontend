import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={"mx-auto my-auto flex-col min-h-screen bg-white flex justify-between"}>
      <Component {...pageProps} />
    </div>
  );
}
