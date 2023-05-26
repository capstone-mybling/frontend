import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import { PostComment } from "@/libs/client/types";
import { dateCalculator } from "@/libs/client/dateCalculator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CommentDetail extends PostComment {
  author: {
    address: string;
    avatar: string;
    username: string;
  };
  isMine: boolean;
  likes: number;
  isLiked: boolean;
}

interface CommentProps {
  comment: CommentDetail;
}

export default function Comment({ comment }: CommentProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    () =>
      axios.delete(`/api/posts/${comment.postAddress}/comments/${comment.id}`),
    {
      onSuccess: async () => {
        console.log("댓글 삭제 성공!");
        await queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex">
        <div className="justify-start w-auto mr-4">
          <UserAvatar
            isMine={comment.isMine}
            size="small"
            UserAddr={comment.authorAddress}
            UserName={comment.author.username}
            UserImage={comment.author.avatar}
          />
        </div>
        <div className="flex-row justify-self-stretch pr-3 ">
          <p className="text-gray-600">{comment.content}</p>
          <div className="text-gray-500 text-xs">
            <span>{dateCalculator(comment.createdAt)}</span>
            <span>&nbsp; &nbsp; </span>
            {comment.isMine && (
              <span
                className=" hover:cursor-pointer"
                onClick={() => deleteMutation.mutate()}
              >
                삭제
              </span>
            )}
          </div>
        </div>
      </div>
      <LikeButton
        isLiked={comment.isLiked}
        likes={comment.likes}
        address={comment.postAddress}
        comment={comment.id.toString()}
      />
    </div>
  );
}
