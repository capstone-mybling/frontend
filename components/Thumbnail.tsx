import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type OptionStyle = "Thumnail" | "Post";

type Props = {
  thumbnail: string;
  address: string;
  option?: OptionStyle;
  link: string;
};

export default function Thumbnail({ thumbnail, address, option = "Post", link, ...rest }: Props) {
  return (
    <Link
      className={`${getOptionStyle(option).style}`}
      href={link}
    >
      <Image
        src={thumbnail}
        alt={address}
        width={100}
        height={0}
        className={"w-full h-auto"}
      ></Image>
    </Link>
  );
}
// css 추후 변경 가능하도록 props로 'option' 넣어쑵니다
function getOptionStyle(option: OptionStyle) {
  switch (option) {
    case "Post":
      return {
        style:
          "flex items-center justify-center aspect-square bg-gray-300 rounded-3xl hover:cursor-pointer",
      };
    case "Thumnail":
      return {
        style: "flex items-center justify-center aspect-square bg-gray-300 hover:cursor-pointer",
      };
  }
}
