import Link from "next/link";
import fs from "fs";
import path from "path";
import Layout from "../../components/layout";
import Image from "next/image";

export default function Home({ data }: any) {
  console.log(data);
  return (
    <Layout hasTabBar>
      <div>
        <h1 className="w-full flex-none mb-2 text-2xl font-semibold text-blue-700">
          임의로 만든 포스트.. 딱! 3개
        </h1>
        <ul className="">
          {data.map((item: any) => (
            <li
              className="mt-6 py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
              key={item.id}
            >
              <Link href={`/posts/${item.id}`}>
                <Image
                  src={`/${item.image}`}
                  alt={item.body}
                  width="300"
                  height="300"
                />
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  return {
    props: {
      data,
    },
  };
}
