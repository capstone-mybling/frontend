import Link from "next/link";
import fs from "fs";
import path from "path";

export default function Home({ data }) {
  return (
    <div>
      <h1 className="w-full flex-none mb-2 text-2xl font-semibold text-blue-700">
        포오오스트 예시 리스트 ㅇㅇ
      </h1>
      <ul className="">
        {data.map((item) => (
          <li
            className="mt-6 py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            key={item.id}
          >
            <Link href={`/posts/${item.id}`}>
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
