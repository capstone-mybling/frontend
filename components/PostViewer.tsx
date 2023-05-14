import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import HeartIcon from "@components/icons/HeartIcons";
import HeartFillIcon from "@components/icons/HeartFillIcon";
import { cls } from "@libs/client/utils";
import UserAvatar from "@components/UserAvatar";
import Thumbnail from "./Thumbnail";
import { useMutation } from "react-query";
import axios from "axios";

interface PostProps {
  thumbnail: any;
  address: string;
  content?: string;
  UserName?: string;
  UserImage?: string;
  likes?: number;
  className?: string;
  small?: boolean;
  ownerName?: string;
  ownerImage?: string;
  isLiked?: boolean;
}

export default function PostViewer({
  thumbnail,
  address,
  content,
  UserName,
  UserImage,
  likes,
  small,
  className,
  ownerName,
  ownerImage,
  isLiked,
  ...rest
}: PostProps) {
  const postContentRef = useRef<HTMLDivElement>(null);
  const [shouldSummarize, setShouldSummarize] = useState<boolean>(false);
  const [fillHeart, setFillHeart] = useState<boolean>(isLiked || false);
  const [likeCount, setLikeCount] = useState<number>(likes || 0);
  useEffect(() => {
    if (postContentRef.current) {
      const lineCount =
        postContentRef.current.clientHeight /
        parseInt(getComputedStyle(postContentRef.current).lineHeight);
      setShouldSummarize(lineCount > 2);
    }
  }, [content]);
  const disLikeMutation = useMutation(
    (data: { address: string }) => axios.delete(`api/posts/${address.substring(5)}/likes`),
    {
      onSuccess: () => {
        setFillHeart(false);
        setLikeCount(likeCount - 1);
      },
    }
  );
  const likeMutation = useMutation(
    (data: { address: string }) => axios.post(`api/posts/${address.substring(5)}/likes`),
    {
      onSuccess: () => {
        setFillHeart(true);
        setLikeCount(likeCount + 1);
      },
    }
  );
  const handleLike = async () => {
    if (fillHeart) {
      //do dislike
      disLikeMutation.mutate({ address });
    } else {
      //do like
      likeMutation.mutate({ address });
    }
  };
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
                // link={}
              />
            </div>
            {/* 좋아요 수 */}
            <div
              className={cls(
                "flex items-center space-x-1 hover:cursor-pointer",
                small ? " w-10" : ""
              )}
              onClick={handleLike}
            >
              {fillHeart ? <HeartFillIcon /> : <HeartIcon />}
              <span className={cls(small ? "text-xs" : "")}>{likeCount}</span>
            </div>
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
