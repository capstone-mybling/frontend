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
import { User } from "@prisma/client";

interface userInfo extends User {
  followings: string[];
  followers: string[];
}
export default function UserPage() {
  const router = useRouter();
  const { address } = router.query;

  const [value, setValue] = useState("1");
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
  let [followers, setFollowers] = useState<number>(999);
  useEffect(() => {
    // console.log(address);
    axios
      .get(`../api/users/${address}`)
      .then((response) => {
        // console.log(response.data.data);
        setUserInfo(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [address]);
  console.log(userInfo.followings);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleFollowBtn = () => {
    if (follow === "FOLLOW") {
      setFollow("UNFOLLOW");
      setFollowers(++followers);
    } else {
      setFollow("FOLLOW");
      setFollowers(--followers);
    }
  };

  return (
    <Layout>
      <section className="flex flex-col justify-center items-center pb-12 border-b border-neutral-300 px-10">
        <div className="flex flex-row justify-end w-[115%] pt-2 pb-10">
          <button
            onClick={handleFollowBtn}
            className="bg-violet-500 opacity-30 px-6 py-1 rounded-2xl text-white hover:opacity-70"
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
        <div>
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl bg-gray-100">
            <FollowerModal userFollower={userInfo?.followers} />
            <FollowingModal userFollowing={userInfo?.followings} />
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
                  <Thumbnail
                    thumbnail={src}
                    address={`posts/${2}`}
                    option="Thumnail"
                  />
                  <Thumbnail
                    thumbnail={src}
                    address={`posts/${2}`}
                    option="Thumnail"
                  />

                  <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                    test
                  </div>
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
                  <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                    test
                  </div>
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
