import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { useState } from "react";
import src from "@public/exam2.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";

export default function UserPage() {
  // MUI tabs
  const [value, setValue] = useState("1");
  const [follow, setFollow] = useState("FOLLOW");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleFollowBtn = () => {
    if (follow === "FOLLOW") setFollow("UNFOLLOW");
    else setFollow("FOLLOW");
  };

  return (
    <Layout>
      <section className="flex flex-col justify-center items-center pb-12 border-b border-neutral-300 px-10">
        <div className="flex flex-row justify-end w-[115%] pt-2 pb-10">
          <button
            onClick={handleFollowBtn}
            className="bg-black opacity-30 px-6 py-1 rounded-2xl text-white hover:opacity-70"
          >
            {follow}
          </button>
        </div>
        <UserAvatar
          size="Xlarge"
          UserImage="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          UserName="not mypage"
        />
        <div>
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl bg-gray-100">
            <button>
              <span className="mr-2 font-bold">12</span>
              <span className="font-semibold text-gray-400">Followers</span>
            </button>
            <button>
              <span className="mr-2 font-bold">34</span>
              <span className="font-semibold text-gray-400">Followings</span>
            </button>
          </div>
          <div className="text-gray-500">
            <div className="py-4 font-extrabold">About</div>
            <p>
              반복되는 하루에 시작이 되는 이 노래 <br />니 옆에서 불러주겠어
              힘내야지 뭐 어쩌겠어?
              <br />
              Ah, 파이팅 해야지 <br />
              Ah, 파이팅 해야지 <br />
              Don't give it up, never give it up, yeah <br />
              파이팅 해야지 <br />
              Ah, 파이팅 해야지 <br />
              우린 부석순 <br />
              Ah, 파이팅 해야지
            </p>
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
