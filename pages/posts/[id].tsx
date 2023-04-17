import React, { useState } from "react";
import { useRouter } from "next/router";
import data from "../../data.json";
import Layout from "@/components/Layout";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HeartIcon from "@/components/icons/HeartIcons";
import HeartFillIcon from "@/components/icons/HeartFillIcon";
import ToggleButton from "@/components/ToggleButton";
import CommentIcon from "@/components/icons/CommentIcon";
import CommentFillIcon from "@/components/icons/CommentFillIcon";
import UserAvatar from "@/components/UserAvatar";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: HTMLImageElement;
};

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [like, setLike] = React.useState(false);
  const [comment, setComment] = React.useState(false);
  const isFooterVisible = false;

  const [comments, setComments] = useState([
    { id: 1, content: "빵댕이 ㅈㄴ크네" },
    { id: 2, content: "바지랑 신발이랑 깔맞춤 한거보소" },
    { id: 3, content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋ" },
  ]);
  const [newComment, setNewComment] = useState("");

  // 댓글 추가
  const handleAddComment = () => {
    const newId = comments.length + 1;
    const newCommentObj = { id: newId, content: newComment };
    setComments([...comments, newCommentObj]);
    setNewComment("test");
    // console.log(comments);
  };

  // 댓글 삭제
  const handleDeleteComment = (id: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: any) => post.id === Number(id));
  // console.log("post나오나? -> ", post);

  if (!post) {
    return <div>post 데이터 읽어오지 못함</div>; // post가 undefined이면 로딩 메시지를 표시
  }

  return (
    <Layout hasTabBar isFooterVisible={isFooterVisible}>
      <div className="py-4 px-4 max-w-mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
        {/* header info : 사용자 정보 & 작성시간 */}
        <div className="flex flex-1 items-center justify-between">
          <UserAvatar size="medium" />
          <p>5 minutes ago</p>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center align-middle py-6 bg-gray-200">
          <Image
            src={`/${post.image}`}
            alt={post.title}
            width="400"
            height="400"
          />
        </div>
        <div className="absolute bottom-2 right-2">
          <button className="bg-black opacity-30 px-6 py-1 rounded-2xl text-white hover:opacity-70">
            <a href="https://opensea.io/">구매하기</a>
          </button>
        </div>
      </div>
      {/* post info : 좋아요, 공유, 가격 */}
      <div className="flex flex-col px-2 py-4 justify-center">
        <div className="">
          <ToggleButton
            toggled={like}
            onToggle={setLike}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
        </div>
        <div>
          <ToggleButton
            toggled={comment}
            onToggle={setComment}
            onIcon={<CommentFillIcon />}
            offIcon={<CommentIcon />}
          />
        </div>
        {/* <div className="mr-auto">
            <button className="bg-white border-black border-2 rounded-full p-2">공유하기</button>
          </div>
          <div>
            <button className="bg-white border-black border-2 rounded-full p-2">
              가격 : 0.05ETH
            </button>
          </div>
        </div>
        {/* post detail : 게시글 상세정보 */}
        <div className="py-4 px-4 ">
          <h1 className="font-bold text-orange-500">{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <div className="border-t-2 my-4 py-4">
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="flex justify-between px-5">
                <UserAvatar size="small" />
                {comment.content}
                <div className="gap-0">
                  <ToggleButton
                    toggled={like}
                    onToggle={setLike}
                    onIcon={<HeartFillIcon />}
                    offIcon={<HeartIcon />}
                  />
                  <button
                    className="text-violet-200 ml-2 text-3xl"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 z-20">
            <form
              className="flex border-t border-neutral-300 p-3"
              onSubmit={onSubmit}
            >
              <input
                className="w-full ml-2 border-none outline-none"
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="font-bold text-violet-500 ml-2"
                onClick={handleAddComment}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
