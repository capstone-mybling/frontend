import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ProfileSize = "small" | "medium" | "large" | "Xlarge";

interface AvatarProps {
  UserName: string;
  UserImage: string;
  size?: ProfileSize;
}

export default function UserAvatar({ UserName, UserImage, size = "large", ...rest }: AvatarProps) {
  return (
    <div>
      {/* Link 태그 - user상세페이지 추후 수정예정 */}
      <Link href="/user/username">
        <div className={`flex items-center space-x-3 ${getAvatarSize(size).flex}`}>
          <Image
            className="inline-block rounded-full ring-2 ring-gray-200"
            src={UserImage}
            alt="user profile image"
            width={parseInt(getAvatarSize(size).width)}
            height={parseInt(getAvatarSize(size).height)}
            unoptimized={false}
          />
          <span className={`${getAvatarSize(size).textSize}`}>{UserName}</span>
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
    case "Xlarge":
      return {
        width: "100",
        height: "100",
        textSize: "text-[50px]",
        flex: "flex flex-col justify-center",
      };
  }
}
