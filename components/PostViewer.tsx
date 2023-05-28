import React, { useEffect, useRef, useState } from "react";
import { cls } from "@libs/client/utils";
import UserAvatar from "@components/UserAvatar";
import Thumbnail from "./Thumbnail";
import LikeButton from "./LikeButton";
import useWeb3 from "@/hooks/useWeb3";
import Link from "next/link";
import Image from "next/image";
import Logo from "@public/logo.png";

interface PostProps {
  thumbnail: any;
  address: string;
  content: string;
  UserName?: string;
  UserAddr: string;
  UserImage?: string | null;
  likes: number;
  small?: boolean;
  ownerName?: string;
  ownerImage?: string;
  ownerAddress?: string;
  isLiked: boolean;
  className?: string;
}

export default function PostViewer({
  thumbnail,
  address,
  content,
  UserName,
  UserAddr,
  UserImage,
  likes,
  small,
  ownerName,
  ownerImage,
  ownerAddress,
  isLiked,
  className,
  ...rest
}: PostProps) {
  const postContentRef = useRef<HTMLDivElement>(null);
  const [shouldSummarize, setShouldSummarize] = useState<boolean>(false);
  const { account } = useWeb3();
  useEffect(() => {
    if (postContentRef.current) {
      const lineCount =
        postContentRef.current.clientHeight /
        parseInt(getComputedStyle(postContentRef.current).lineHeight);
      setShouldSummarize(lineCount > 2);
    }
  }, [content]);
  return (
    <>
      {/* 게시글 */}
      <section
        className={cls(
          "m-1 bg-white grid-cols-1 justify-center items-center space-y-3",
          className ? className : ""
        )}
      >
        {small ? null : (
          // {/* top */}
          <div className="flex justify-between pr-3">
            {/* 프로필 */}
            <div className="flex items-center space-x-3">
              <UserAvatar
                size={"medium"}
                UserName={UserName!}
                UserImage={UserImage!}
                UserAddr={UserAddr}
                isMine={account === UserAddr}
              />
            </div>
            {/* 좋아요 수 */}
            <LikeButton
              isLiked={isLiked}
              likes={likes}
              address={address}
            />
          </div>
        )}
        {/* 썸네일 */}
        <Thumbnail
          thumbnail={thumbnail}
          address={address}
          link={address}
        />
        {small ? null : (
          <>
            {/* 게시글 내용(bottom) */}
            <div className="px-1">
              <div
                ref={postContentRef}
                className={cls(
                  "transition-all duration-300",
                  shouldSummarize ? "line-clamp-2" : "line-clamp-none",
                  small ? "text-xs" : "text-sm"
                )}
              >
                {content}
              </div>
              <button
                className={cls("text-xs", shouldSummarize ? "" : "hidden")}
                onClick={() => {
                  setShouldSummarize(false);
                }}
              >
                더보기
              </button>
            </div>
            {/* current owner */}
            <div className="px-1 flex space-x-2 items-center">
              {ownerImage && (
                <div className="inline-block rounded-full ring-2 ring-pantone-light w-6 h-6">
                  <Image
                    width={40}
                    height={40}
                    src={ownerImage}
                    alt="owner avatar"
                  />
                </div>
              )}
              <span className="text-sm font-extrabold text-pantone">Current Owner</span>
              {ownerName !== undefined ? (
                <Link
                  className="text-sm font-bold text-pantone-darker"
                  href={`/profile/${ownerAddress}`}
                >
                  {ownerName}
                </Link>
              ) : (
                <Image
                  width={40}
                  height={40}
                  src={Logo}
                  alt="MFT"
                />
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
