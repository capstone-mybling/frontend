import UserAvatar from "@/components/UserAvatar";
import Layout from "../../components/layout";

export default function MyPage() {
  return (
    <Layout>
      <section className="flex flex-col justify-center items-center py-12 border-b border-neutral-300">
        <UserAvatar size="Xlarge" />
        <div>
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl bg-gray-100">
            <button>
              <span className="mr-2 font-bold">220</span>
              <span className="font-semibold text-gray-400">Followers</span>
            </button>
            <button>
              <span className="mr-2 font-bold">130</span>
              <span className="font-semibold text-gray-400">Followings</span>
            </button>
          </div>
          <div className="px-10 text-gray-500">
            <div className="py-4">About</div>
            <p>
              Mamá없는 Corea 축구 잘 봤다 사실 나는 오래전에 Naturalización했다.
              Español으로 한국과 상관 없어요 나 Gracias 그 동안의 관심.
              Bastardo들아 자꾸 엮는다 나랑 Corea?? 하지마라 다시 한번 말합니다.
              나는 이제 Español 사람 아니면 가르쳐준다 나는. 너의 Mamá에게 Sexo.
            </p>
          </div>
          <div></div>
        </div>
      </section>
    </Layout>
  );
}
