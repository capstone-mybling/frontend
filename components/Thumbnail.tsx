import Image from "next/image";
import Link from "next/link";

type OptionStyle = "Thumnail" | "Post" | "Explore";

type Props = {
  thumbnail: any;
  address: string;
  option?: OptionStyle;
  link?: string;
};

export default function Thumbnail({
  thumbnail,
  address,
  option = "Post",
  link,
  ...rest
}: Props) {
  return (
    <Link
      className={`m-0 ${getOptionStyle(option).style}`}
      href={`/posts/${link}` || ""}
    >
      <Image
        src={thumbnail}
        alt={address}
        width={1980}
        height={0}
        className={"h-full x-auto block object-cover m-0"}
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
          "flex items-center justify-center aspect-square bg-gray-100 rounded-3xl hover:cursor-pointer",
      };
    case "Thumnail":
      return {
        style:
          "flex items-center justify-center aspect-square bg-gray-100 hover:cursor-pointer",
      };
    case "Explore":
      return {
        style:
          "flex items-center justify-center aspect-3/4 bg-gray-400 hover:cursor-pointer",
      };
  }
}
