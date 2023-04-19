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

export default function MyPage() {
  // MUI tabs
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <section className="flex flex-col justify-center items-center py-12 border-b border-neutral-300 px-10">
        <UserAvatar
          size="Xlarge"
          UserImage="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          UserName="myprofile"
        />
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
          <div className="text-gray-500">
            <div className="py-4 font-extrabold">About</div>
            <p>
              Mamá없는 Corea 축구 잘 봤다 사실 나는 오래전에 Naturalización했다.
              Español으로 한국과 상관 없어요 나 Gracias 그 동안의 관심.
              Bastardo들아 자꾸 엮는다 나랑 Corea?? 하지마라 다시 한번 말합니다.
              나는 이제 Español 사람 아니면 가르쳐준다 나는. 너의 Mamá에게 Sexo.
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
