import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import HeartIcon from "@components/icons/HeartIcons";
import HeartFillIcon from "@components/icons/HeartFillIcon";
import { cls } from "@libs/client/utils";

interface PostProps {
  thumbnail: StaticImageData;
  address: string;
  content: string;
  UserName: string;
  UserAvatar: string;
  likes: number;
}

export default function PostViewer({
  thumbnail,
  address,
  content,
  UserName,
  UserAvatar,
  likes,
  ...rest
}: PostProps) {
  const postContentRef = useRef<HTMLDivElement>(null);
  const [shouldSummarize, setShouldSummarize] = useState<boolean>(false);
  if (postContentRef.current) {
    console.log(postContentRef.current.clientHeight);
    const lineCount =
      postContentRef.current.clientHeight /
      parseInt(getComputedStyle(postContentRef.current).lineHeight);
    if (lineCount > 2) {
      setShouldSummarize(true);
    } else {
      setShouldSummarize(false);
    }
  }
  return (
    <>
      {/* 게시글 */}
      <section className="m-0 bg-white grid-cols-1 justify-center items-center space-y-3">
        {/* top */}
        <div className="flex justify-between pr-3">
          {/* 프로필 */}
          <div className="flex items-center space-x-3">
            <Image
              className="inline-block rounded-full ring-2 ring-gray-200"
              src={UserAvatar}
              alt=""
              width={48}
              height={48}
              unoptimized={true}
            />
            <span className=" text-xl">{UserName}</span>
          </div>
          {/* 좋아요 수*/}
          <div className="flex items-center space-x-1">
            <HeartIcon />
            <span>{likes}</span>
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
            className={cls(
              "text-sm transition-all duration-300",
              shouldSummarize ? "line-clamp-2" : "line-clamp-none"
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
