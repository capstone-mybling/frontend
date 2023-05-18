import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ProfileSize = "small" | "medium" | "large" | "Xlarge";

interface AvatarProps {
  UserName: string;
  UserImage: string;
  UserAddr: string;
  size?: ProfileSize;
  route?: boolean;
}

export default function UserAvatar({
  UserName,
  UserImage,
  UserAddr,
  size = "large",
  route = true,
  ...rest
}: AvatarProps) {
  return (
    <div>
      {route ? (
        <Link href={`/profile/${UserAddr}`}>
          <div
            className={`flex items-center space-x-3 ${
              getAvatarSize(size).flex
            }`}
          >
            <Image
              className="inline-block rounded-full ring-2 ring-gray-200"
              src={UserImage}
              alt="user profile image"
              width={parseInt(getAvatarSize(size).width)}
              height={parseInt(getAvatarSize(size).height)}
              unoptimized={false}
            />
            <span className={`${getAvatarSize(size).textSize}`}>
              {UserName}
            </span>
          </div>
        </Link>
      ) : (
        <div
          className={`flex items-center space-x-3 ${getAvatarSize(size).flex} `}
        >
          <Image
            className="inline-block rounded-full ring-2 ring-gray-200 aspect-square"
            src={UserImage}
            alt="user profile image"
            width={parseInt(getAvatarSize(size).width)}
            height={parseInt(getAvatarSize(size).height)}
            unoptimized={false}
          />
          <span className={`${getAvatarSize(size).textSize}`}>{UserName}</span>
        </div>
      )}
    </div>
  );
}

function getAvatarSize(size: ProfileSize) {
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
    case "Xlarge":
      return {
        width: "100",
        height: "100",
        textSize: "text-[50px]",
        flex: "flex flex-col justify-center",
      };
  }
}
