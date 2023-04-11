import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={"mx-auto my-auto flex-col min-h-screen bg-gray-100 flex justify-between"}>
      <Component {...pageProps} />
    </div>
  );
}
