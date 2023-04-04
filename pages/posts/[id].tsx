import { useRouter } from "next/router";
import data from "../../data.json";
import Layout from "../../components/layout";
import Image from "next/image";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: HTMLImageElement;
}

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: any) => post.id === Number(id));
  console.log("post나오나? -> ", post);

  if (!post) {
    return <div>에러발생 ㅜ ㅜ ㅜ ㅜ ㅜ post가 왜 자꾸 비는거야..</div>; // post가 undefined이면 로딩 메시지를 표시
  }

  return (
    <Layout hasTabBar>
      <div className="flex justify-center align-middle py-8 border-b-2 border-stone-500">
        <Image
          src={`/${post.image}`}
          alt={post.title}
          width="400"
          height="400"
        />
      </div>
      <div className="py-4 px-4 max-w-mx-auto shadow-lg space-y-2 flex flex-low items-start space-x-10 justify-between">
        <div>
          <h4>사용자 이름</h4>
          <p>nickname</p>
        </div>
        <div>
          <button className="bg-slate-500 p-2 rounded-2xl">구매하기</button>
        </div>
      </div>
      <div className="py-4 px-4 ">
        <h1 className="font-bold text-orange-500">{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </Layout>
  );
};

export default Post;
