import { cls } from "@/libs/client/utils";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcons";

interface LikeButtonProps {
  isLiked: boolean;
  likes: number;
  address: string;
  comment?: string;
}

export default function LikeButton({ isLiked, likes, address, comment, ...rest }: LikeButtonProps) {
  const [fillHeart, setFillHeart] = useState<boolean>(isLiked || false);
  const [likeCount, setLikeCount] = useState<number>(likes || 0);
  const queryClient = useQueryClient();

  const disLikeMutation = useMutation(
    () =>
      axios.delete(
        comment ? `/api/posts/${address}/comments/${comment}/likes` : `/api/posts/${address}/likes`
      ),
    {
      onSuccess: () => {
        setFillHeart(false);
        setLikeCount(likeCount - 1);
      },
    }
  );

  const likeMutation = useMutation(
    () =>
      axios.post(
        comment ? `/api/posts/${address}/comments/${comment}/likes` : `/api/posts/${address}/likes`
      ),
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
      disLikeMutation.mutate();
    } else {
      //do like
      likeMutation.mutate();
    }
  };
  return (
    <div
      className={cls(
        "flex items-center space-x-1 hover:cursor-pointer",
        comment ? "w-8 text-m" : ""
      )}
      onClick={handleLike}
    >
      {fillHeart ? <HeartFillIcon /> : <HeartIcon />}
      <span>{likeCount}</span>
    </div>
  );
}
