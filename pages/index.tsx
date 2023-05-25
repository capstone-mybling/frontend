import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import PostViewer from "@/components/PostViewer";
import { Post, PostComment, User, Transfer } from "@libs/client/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MainLoading from "@/components/icons/MainLoading";

interface PostResponse extends Post {
  likes: number;
  isLiked: boolean;
  author: User;
  comments: PostComment;
  currentOwner?: {
    address: string;
    username: string;
    avatar: string;
  };
}

const Home: NextPage = () => {
  const { isLoading, error, data, status } = useQuery<PostResponse[]>({
    queryKey: ["posts"],
    queryFn: () => axios.get("api/posts").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  });
  console.log(data);
  return isLoading ? (
    <MainLoading />
  ) : (
    <Layout>
      <Head>
        <title>mybling | 마블링</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div className=" grid-cols-1 space-y-7 p-5">
        {!data || data.length === 0 ? ( // loading component
          <div className="text-center font-extrabold text-gray-400 mt-20">
            <h1 className="text-4xl">게시글이 없습니다.</h1>
            <h3 className="text-lg">게시글을 생성한 후 확인해 주세요</h3>
          </div>
        ) : (
          data.map((post) => (
            <PostViewer
              key={post.id}
              thumbnail={post.thumbnail}
              address={post.address}
              UserAddr={post.authorAddress}
              content={post.description}
              UserName={post.author.username || ""}
              UserImage={post.author.avatar}
              likes={post.likes}
              ownerName={post.currentOwner?.username}
              ownerImage={post.currentOwner?.avatar}
              ownerAddress={post.currentOwner?.address}
              isLiked={post.isLiked}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Home;
