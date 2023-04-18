import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import HeartIcon from "@components/icons/HeartIcons";
import HeartFillIcon from "@components/icons/HeartFillIcon";
import { cls } from "@libs/client/utils";
import UserAvatar from "@components/UserAvatar";

interface PostProps {
  thumbnail: StaticImageData;
  address: string;
  content: string;
  UserName: string;
  UserImage: string;
  likes: number;
  small?: boolean;
}

export default function PostViewer({
  thumbnail,
  address,
  content,
  UserName,
  UserImage,
  likes,
  small,
  ...rest
}: PostProps) {
  const postContentRef = useRef<HTMLDivElement>(null);
  const [shouldSummarize, setShouldSummarize] = useState<boolean>(false);
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
      <section className="m-1 bg-white grid-cols-1 justify-center items-center space-y-3">
        {/* top */}
        <div className="flex justify-between pr-3">
          {/* 프로필 */}
          <div className="flex items-center space-x-3">
            <UserAvatar
              size={small ? "small" : "medium"}
              UserName={UserName}
              UserImage={UserImage}
            />
          </div>
          {/* 좋아요 수*/}
          <div className={cls("flex items-center space-x-1", small ? " w-10" : "")}>
            <HeartIcon />
            <span className={cls(small ? "text-xs" : "")}>{likes}</span>
          </div>
        </div>
        {/* 썸네일 */}
        <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-3xl hover:cursor-pointer">
          <Image
            src={thumbnail}
            alt={address}
          ></Image>
        </div>
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
      </section>
    </>
  );
}
