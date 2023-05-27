import Logo from "@public/logo.png";
import Image from "next/image";
export default function ProgressLoading() {
  return (
    <div className="mx-auto fixed inset-0 max-w-[500px] h-screen z-50 bg-white bg-opacity-70 flex flex-col justify-center items-center">
      <h2 className="fixed pt-40 text-center inset-0 font-extrabold text-4xl text-gray-700">
        MINTING...
      </h2>
      <Image
        className="h-1/6 w-1/4 my-auto opacity-90 transition animate-spin"
        src={Logo}
        alt="mybling"
        width={70}
      />
    </div>
  );
}
