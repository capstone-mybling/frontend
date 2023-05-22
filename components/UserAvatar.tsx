import Image from "next/image";
import Link from "next/link";

type ProfileSize = "small" | "medium" | "large" | "XLarge";

interface AvatarProps {
  UserName?: string;
  UserImage?: string;
  UserAddr: string;
  size: ProfileSize;
  isMine: boolean;
  route?: boolean;
}

interface AvatarSize {
  textSize: string;
  width: string;
  height: string;
  flex?: string;
}

const DEFAULT_PROFILE_IMAGE =
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const setDefaultAvatar = (avatar?: string) => {
  return avatar ?? DEFAULT_PROFILE_IMAGE;
};

export default function UserAvatar({
  UserName,
  UserImage,
  UserAddr,
  size = "large",
  isMine = false,
  route = true,
  ...rest
}: AvatarProps) {
  return (
    <div>
      <Link href={isMine ? "/profile" : `/profile/${UserAddr}`}>
        <div
          className={`flex items-center space-x-3 ${getAvatarSize(size)?.flex}`}
        >
          <Image
            className="inline-block rounded-full ring-2 ring-gray-200 aspect-square"
            src={setDefaultAvatar(UserImage)}
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

function getAvatarSize(size: ProfileSize): AvatarSize {
  switch (size) {
    case "small":
      return {
        width: "32",
        height: "32",
        textSize: "text-[15px]",
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
    case "XLarge":
      return {
        width: "100",
        height: "100",
        textSize: "text-[50px]",
        flex: "flex flex-col justify-center",
      };
  }
}
