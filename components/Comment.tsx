import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import { PostComment } from "@/libs/client/types";
import { dateCalculator } from "@/libs/client/dateCalculator";

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
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex">
        <div className="justify-start w-auto mr-2">
          <UserAvatar
            isMine={comment.isMine}
            size="small"
            UserAddr={comment.authorAddress}
            UserName={comment.author.username}
            UserImage={comment.author.avatar}
          />
        </div>
        <div className="flex-row justify-self-stretch pr-3 ">
          <p className="">{comment.content}</p>
          <div className="text-gray-500 text-xs">{dateCalculator(comment.createdAt)}</div>
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
