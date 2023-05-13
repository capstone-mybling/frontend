import Image, { StaticImageData } from "next/image";

type OptionStyle = "Thumnail" | "Post";

type Props = {
  thumbnail: StaticImageData;
  address: string;
  option?: OptionStyle;
};

export default function Thumbnail({
  thumbnail,
  address,
  option = "Post",
}: Props) {
  return (
    <div className={`${getOptionStyle(option).style}`}>
      <Image
        src={thumbnail}
        alt={address}
        width={140}
        height={140}
        className={`${getOptionStyle(option)}`}
      ></Image>
    </div>
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
        style:
          "flex items-center justify-center aspect-square bg-gray-300 hover:cursor-pointer",
      };
  }
}
