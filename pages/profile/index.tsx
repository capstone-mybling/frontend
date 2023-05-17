import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import FollowerModal from "@/components/FollowerModal";
import FollowingModal from "@/components/FollowingModal";
import { User, UserFollow, Post } from "@libs/client/types";
import MypageLoading from "@/components/MypageLoading";

interface UserWithFollow extends User {
  followings: string[];
  followers: string[];
}

export default function MyPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserWithFollow>({
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
  const [userPost, setUserPost] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("api/users/me")
      .then((response) => {
        setUserData(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(userData.followings);

  useEffect(() => {
    axios.get("api/posts").then((response) => {
      setUserPost(response.data.data);
      // console.log("posts 받아온 데이터 : ", response.data.data);
    });
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      // console.log("로딩 끝, 받아온 데이터 = ", userData);
    }
  }, [userData]);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return isLoading ? (
    <MypageLoading />
  ) : (
    <Layout>
      <section className="flex flex-col justify-center items-center py-12 border-b border-neutral-300 px-10">
        <UserAvatar
          size="Xlarge"
          UserImage={userData?.avatar || ""}
          UserName={userData?.username || ""}
          UserAddr={userData?.address || ""}
        />
        <div>
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl ">
            <FollowerModal userFollower={userData?.followers} />
            <FollowingModal userFollowing={userData?.followings} />
          </div>
          <div className="text-gray-500">
            <div className="py-4 font-extrabold">About</div>
            <p>{userData?.description}</p>
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
                  <Tab label="내가만든NFT" value="1" />
                  <Tab label="구매한NFT" value="2" />
                </Tabs>
              </Box>
              <TabPanel value="1" sx={{ paddingTop: 3, paddingX: 0 }}>
                <div className="grid grid-cols-3 gap-4">
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
                </div>
              </TabPanel>
              <TabPanel value="2" sx={{ paddingTop: 3, paddingX: 0 }}>
                <div className="grid grid-cols-3 gap-4">
                  <Thumbnail
                    thumbnail={userData?.avatar}
                    address={`posts/${2}`}
                    option="Thumnail"
                    link={userData?.address}
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
