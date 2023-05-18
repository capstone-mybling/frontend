import { cls } from "@/libs/client/utils";
import axios from "axios";
import { useMutation } from "react-query";
import { useState } from "react";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcons";

interface LikeButtonProps {
  isLiked: boolean;
  likes: number;
  address: string;
  comment?: boolean;
}

export default function LikeButton({ isLiked, likes, address, comment, ...rest }: LikeButtonProps) {
  const [fillHeart, setFillHeart] = useState<boolean>(isLiked || false);
  const [likeCount, setLikeCount] = useState<number>(likes || 0);
  const disLikeMutation = useMutation(
    (data: { address: string }) => axios.delete(`/api/posts/${address}/likes`),
    {
      onSuccess: () => {
        setFillHeart(false);
        setLikeCount(likeCount - 1);
      },
    }
  );
  const likeMutation = useMutation(
    (data: { address: string }) => axios.post(`/api/posts/${address}/likes`),
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
    <div
      className={cls("flex items-center space-x-1 hover:cursor-pointer")}
      onClick={handleLike}
    >
      {fillHeart ? <HeartFillIcon /> : <HeartIcon />}
      <span>{likeCount}</span>
    </div>
  );
}
