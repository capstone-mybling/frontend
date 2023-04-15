import Image from "next/image";
import Link from "next/link";

type ProfileSize = "small" | "medium" | "large";
type Props = {
  size?: ProfileSize;
};

export default function UserAvatar({ size = "large" }: Props) {
  return (
    <div>
      {/* Link 태그 - user상세페이지 추후 수정예정 */}
      <Link href="/user/username">
        <div className="flex items-center space-x-3">
          <Image
            className="inline-block rounded-full ring-2 ring-gray-200"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width={parseInt(getAvatarSize(size).width)}
            height={parseInt(getAvatarSize(size).height)}
            unoptimized={true}
          />
          <span className={`${getAvatarSize(size).textSize}`}>userName</span>
        </div>
      </Link>
    </div>
  );
}

function getAvatarSize(size: ProfileSize) {
  switch (size) {
    case "small":
      return {
        width: "32",
        height: "32",
        textSize: "text-[14px]",
      };
    case "medium":
      return {
        width: "48",
        height: "48",
        textSize: "text-[18px]",
      };
    case "large":
      return {
        width: "64",
        height: "64",
        textSize: "text-[24px]",
      };
  }
}
