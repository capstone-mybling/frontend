import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { useEffect, useState } from "react";
import src from "@public/exam2.png";
import axios from "axios";
import FollowerModal from "@/components/FollowerModal";
import FollowingModal from "@/components/FollowingModal";
import { Post, User } from "@libs/client/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MypageLoading from "@/components/MypageLoading";
import { GetServerSideProps } from "next";

interface userInfo extends User {
  followings: string[];
  followers: string[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};

interface HomeProps {
  address: string;
}

enum TabType {
  POST = "post",
  OWNED = "owned",
}

const Home = ({ address }: HomeProps) => {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery<userInfo>({
    queryKey: ["users", address!],
    queryFn: () =>
      axios.get(`/api/users/${address}`).then((response) => response.data.data),
  });

  const [userPost, setUserPost] = useState<Post[]>([]);
  const [follow, setFollow] = useState<string>("FOLLOW");
  const [activeTab, setActiveTab] = useState<TabType>(TabType.POST);

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((response) => {
        const otherUserAddr = address;
        const followingList = response.data.data.followings;
        // console.log("other = ", otherUserAddr);
        // console.log("list = ", followingList);
        followingList.some((data: any) => data.address == otherUserAddr)
          ? setFollow("UNFOLLOW")
          : setFollow("FOLLOW");
      })
      .catch((error) => console.log(error));
  });

  const addFollowing = useMutation(
    () => axios.post(`/api/users/follows/${address}`),
    {
      onSuccess: () => {
        setFollow("UNFOLLOW");
        queryClient.invalidateQueries(["users", address!]);
      },
    }
  );
  const delFollowing = useMutation(
    () => axios.delete(`/api/users/follows/${address}`),
    {
      onSuccess: () => {
        setFollow("FOLLOW");
        queryClient.invalidateQueries(["users", address!]);
      },
    }
  );

  const handleFollowBtn = () => {
    if (follow === "FOLLOW") {
      // axios
      //   .post(`/api/users/follows/${address}`)
      //   .then((response) => console.log(response))
      //   .catch((error) => console.log(error));
      addFollowing.mutate();
    } else {
      // axios
      //   .delete(`/api/users/follows/${address}`)
      //   .then((response) => console.log(response))
      //   .catch((error) => console.log(error));
      delFollowing.mutate();
    }
  };

  const customTabChange = (tabIndex: TabType) => {
    setActiveTab(tabIndex);
  };

  return isLoading || data == undefined ? (
    <MypageLoading />
  ) : (
    <Layout>
      <section className="flex flex-col justify-center items-center pb-12 border-b border-neutral-300 px-6">
        <div className="flex flex-row justify-end w-[115%] pt-2 pb-10">
          <button
            onClick={handleFollowBtn}
            className="opacity-30 px-6 py-1 rounded-2xl text-violet-500 hover:opacity-70 font-extrabold"
          >
            {follow}
          </button>
        </div>
        <UserAvatar
          size="XLarge"
          UserImage={data.avatar}
          UserName={data.username}
          UserAddr={data.address}
        />
        <div className="w-full">
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl bg-gray-100">
            <FollowerModal userFollower={data?.followers} delBtn={false} />
            <FollowingModal userFollowing={data?.followings} delBtn={false} />
          </div>
          <div className="text-gray-500">
            <div className="py-4 font-extrabold">About</div>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="mx-auto my-5">
            <button
              className={`px-4 py-2 ${
                activeTab === TabType.POST
                  ? "text-violet-500"
                  : "text-violet-300"
              }`}
              onClick={() => customTabChange(TabType.POST)}
            >
              생성한 NFT
              <p
                className={`${
                  activeTab === TabType.POST &&
                  "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                }`}
              ></p>
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === TabType.OWNED
                  ? "text-violet-500"
                  : "text-violet-300"
              }`}
              onClick={() => customTabChange(TabType.OWNED)}
            >
              구매한 NFT
              <p
                className={`${
                  activeTab === TabType.OWNED &&
                  "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                }`}
              ></p>
            </button>
          </div>
          {activeTab === TabType.POST && (
            <div>
              {data.posts.length === 0 ? (
                // react auery 사용해서 isloagin 구현예정
                <div className="text-center font-extrabold text-gray-400 mx-auto mt-10">
                  <h1 className="text-2xl">게시글이 없습니다.</h1>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {data.posts
                    .slice(0)
                    .reverse()
                    .map((post) => (
                      <li key={post.id} className="list-none">
                        <Thumbnail
                          thumbnail={post.thumbnail}
                          address={post.address}
                          option="Thumnail"
                          link={post.address}
                        />
                      </li>
                    ))}
                </div>
              )}
            </div>
          )}
          {activeTab === TabType.OWNED && (
            <div className="grid grid-cols-3 gap-1">
              <Thumbnail
                thumbnail={src}
                address={`posts/${2}`}
                option="Thumnail"
              />
              <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                test
              </div>
              <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                test
              </div>
              <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                test
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
