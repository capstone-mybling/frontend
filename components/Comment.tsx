import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import { PostComment } from "@/libs/client/types";
import { dateCalculator } from "@/libs/client/dateCalculator";

interface CommentProps {
  comment: PostComment;
}

export default function Comment({ comment }: CommentProps) {
  console.log(comment);
  return (
    <div className="grid grid-cols-8 items-start">
      <div className="justify-self-start">
        <UserAvatar
          size="small"
          UserAddr={comment.authorAddress}
          UserName={"1212"}
          UserImage={
            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
        />
      </div>
      <div className="flex-row justify-self-stretch col-start-3 col-end-8 pr-3">
        <p className="">{comment.content}</p>
        <div className="text-gray-500 text-sm">{dateCalculator(comment.createdAt)}</div>
      </div>
      <div className="flex justify-self-end">
        <LikeButton
          isLiked={false}
          likes={1}
          address=""
          comment
        />
        <button
          className="text-violet-200 ml-2 text-xl"
          // onClick={() => handleDeleteComment(comment.id)}
        >
          X
        </button>
      </div>
    </div>
  );
}