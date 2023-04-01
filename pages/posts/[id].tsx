import { useRouter } from "next/router";
import data from "../../data.json";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: Post) => post.id === Number(id));

  return (
    <div className="mt-6 py-8 px-8 max-w-mx-auto bg-slate-200 rounded-xl shadow-lg space-y-2 py-4 flex flex-col items-start">
      <h1 className="font-bold text-orange-500">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
