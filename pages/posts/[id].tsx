import { useRouter } from "next/router";
import data from "../../data.json";
import Layout from "../../components/layout";
import Image from "next/image";
import * as React from "react";
import HeartIcon from "@/components/icons/HeartIcons";
import HeartFillIcon from "@/components/icons/HeartFillIcon";
import ToggleButton from "@/components/ToggleButton";
import CommentIcon from "@/components/icons/CommentIcon";
import CommentFillIcon from "@/components/icons/CommentFillIcon";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: HTMLImageElement;
};

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [like, setLike] = React.useState(false);
  const [comment, setComment] = React.useState(false);

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: any) => post.id === Number(id));
  console.log("post나오나? -> ", post);

  if (!post) {
    return <div>post 데이터 읽어오지 못함</div>; // post가 undefined이면 로딩 메시지를 표시
  }

  const isFooterVisible = false;

  return (
    <Layout hasTabBar isFooterVisible={isFooterVisible}>
      <div className="py-4 px-4 max-w-mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
        {/* header info : 사용자 정보 & 작성시간 */}
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-solid bg-slate-400 border-black rounded-full"></div>
            <h4>사용자 이름</h4>
          </div>
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
      <div className="flex flex-col">
        {/* post info : 좋아요, 공유, 가격 */}
        <div className="flex px-2 py-4 justify-center gap-[150px]">
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
            <button className="bg-white border-black border-2 rounded-full p-2">
              공유하기
            </button>
          </div>
          <div>
            <button className="bg-white border-black border-2 rounded-full p-2">
              가격 : 0.05ETH
            </button>
          </div> */}
        </div>
        {/* post detail : 게시글 상세정보 */}
        <div className="py-4 px-4 ">
          <h1 className="font-bold text-orange-500">{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <div>
          <div className="sticky bottom-0 z-20">
            <form className="flex border-t border-neutral-300 p-3">
              <input
                className="w-full ml-2 border-none outline-none"
                type="text"
                placeholder="Add a comment..."
              />
              <button className="font-bold text-sky-500 ml-2">Post</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
