import React, { useState, useEffect, useRef } from "react";
import { cls } from "@libs/client/utils";
import UserAvatar from "@components/UserAvatar";
import Thumbnail from "./Thumbnail";
import LikeButton from "./LikeButton";

interface PostProps {
  thumbnail: any;
  address: string;
  content: string;
  UserName?: string;
  UserAddr: string;
  UserImage?: string;
  likes: number;
  small?: boolean;
  ownerName?: string;
  ownerImage?: string;
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
  isLiked,
  className,
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
              <div className="inline-block rounded-full ring-1 ring-gray-200 bg-gray-300 w-6 h-6"></div>
              <span className="text-sm font-extrabold text-gray-500">Current Owner</span>
              <span className="text-sm font-extrabold">{ownerName}</span>
            </div>
          </>
        )}
      </section>
    </>
  );
}
