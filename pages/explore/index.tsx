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
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
        </div>
        {/* right side */}
        <div className="flex w-1/2 flex-col space-y-4">
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
          <PostViewer
            small
            thumbnail={src}
            address={`posts/${2}`}
          ></PostViewer>
        </div>
      </div>
    </Layout>
  );
};
export default Explore;
