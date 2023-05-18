/**
 * todo
 * 1. follow 버튼 클릭 시, 현재 로그인되어있는 계정에 방문한 프로필계정을 팔로우 하는 기능 처리
 * 2. User-Created NFT 항목에 해당 사용자의 포스트를 나열해주는 기능 처리
 */

import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import src from "@public/exam2.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import FollowerModal from "@/components/FollowerModal";
import FollowingModal from "@/components/FollowingModal";
import { User,Post } from "@libs/client/types";
import { error } from "console";

interface userInfo extends User {
  followings: string[];
  followers: string[];
}
export default function UserPage() {
  const router = useRouter();
  const { address } = router.query;

  const [value, setValue] = useState("1");
  const [userPost, setUserPost] = useState<Post[]>([]);
  const [follow, setFollow] = useState<string>("FOLLOW");
  const [userInfo, setUserInfo] = useState<userInfo>({
    id: 0,
    address: "",
    username: "",
    avatar: "",
    description: "",
    lastLoginIP: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    followers: [],
    followings: [],
  });
  useEffect(() => {
    axios
      .get(`../api/users/${address}`)
      .then((response) => {
        // console.log(response.data.data);
        setUserPost(response.data.data.posts.reverse());
        setUserInfo(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [address]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(()=> {
    axios.get('/api/users/me').then((response)=>{
      const otherUserAddr = address;
      const followingList = response.data.data.followings;
      // console.log("other = ", otherUserAddr);
      // console.log("list = ", followingList);
      followingList.some((data: any) => data.address == otherUserAddr) ? setFollow("UNFOLLOW") : setFollow("FOLLOW")
      }).catch((error)=> console.log(error))
  },)

  const handleFollowBtn = () => {
    if (follow === "FOLLOW") {
      axios
      .post(`/api/users/follows/${address}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
      setFollow("UNFOLLOW");
    } else {
      axios
      .delete(`/api/users/follows/${address}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
      setFollow("FOLLOW");
    }
  };

  return (
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
          size="Xlarge"
          UserImage={userInfo.avatar || ""}
          UserName={userInfo.username || ""}
          UserAddr={userInfo.address || ""}
        />
        <div className="w-full">
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl bg-gray-100">
            <FollowerModal userFollower={userInfo?.followers} delBtn={false}/>
            <FollowingModal userFollowing={userInfo?.followings} delBtn={false}/>
          </div>
          <div className="text-gray-500">
            <div className="py-4 font-extrabold">About</div>
            <p>{userInfo.description}</p>
          </div>
          <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="User-Created NFT" value="1" />
                  <Tab label="User-Owned NFT" value="2" />
                </Tabs>
              </Box>
              <TabPanel value="1" sx={{ paddingTop: 3, paddingX: 0 }}>
                <div className="grid grid-cols-3 gap-4">
                  {userPost.length === 0 ? (
                  <div className="text-center font-extrabold text-gray-400 mx-auto">
                    <h1 className="text-2xl">게시글이 없습니다.</h1>
                    <h3 className="text-md">게시글을 생성한 후 확인해 주세요</h3>
                  </div>) : (
                  <>
                    {userPost.map((post) => (
                    <li key={post.id} className="list-none">
                      <Thumbnail
                        thumbnail={post.thumbnail}
                        address={post.address}
                        option="Thumnail"
                        link={post.address}
                      />
                    </li>
                  ))}
                  </>)}
                </div>
              </TabPanel>
              <TabPanel value="2" sx={{ paddingTop: 3, paddingX: 0 }}>
                <div className="grid grid-cols-3 gap-4">
                  <Thumbnail
                    thumbnail={src}
                    address={`posts/${2}`}
                    option="Thumnail"
                  />
                  <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                    test
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </section>
    </Layout>
  );
}
