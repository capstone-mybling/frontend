import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import src from "@public/exam2.png";
import PostViewer from "@/components/PostViewer";
const Explore: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-wrap mx-auto p-1">
        {/* left side */}
        <div className="flex w-1/2 flex-col mt-14 space-y-4">
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
            content={
              "책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다며 시간을 보냅니다."
            }
            UserName={"userName"}
            UserImage={
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            likes={999}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
            content={
              "책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다.책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다.책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다."
            }
            UserName={"userName"}
            UserImage={
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            likes={999}
          ></PostViewer>
        </div>
        {/* right side */}
        <div className="flex w-1/2 flex-col space-y-4">
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
            content={
              "책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다."
            }
            UserName={"userName"}
            UserImage={
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            likes={999}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
            content={
              "책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다."
            }
            UserName={"userName"}
            UserImage={
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            likes={999}
          ></PostViewer>
        </div>
      </div>
    </Layout>
  );
};
export default Explore;
