/**
 * Todos
 * - 팔로워/팔로잉 모달 컴포넌트에게 User에 대한 정보 or User를 팔로워/팔로잉 하는 데이터를 props로 어떻게 넘길지?
 * - isLoading 모양 어찌 처리할지?
 */

import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { useState, useEffect } from "react";
import src from "@public/exam2.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { FileType } from "@prisma/client";
import FollowerModal from "@/components/FollowerModal";
import FollowingModal from "@/components/FollowingModal";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { User } from "@prisma/client";

export default function MyPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    axios
      .get("api/users/me")
      .then((response) => {
        setUserData(response.data.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      console.log("로딩 끝, 받아온 데이터 = ", userData);
    }
  }, [userData]);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return isLoading ? (
    <Stack spacing={1}>
      {/* For other variants, adjust the size with `width` and `height` */}
      <div className="flex justify-center pt-[100px]">
        <Skeleton variant="circular" width={100} height={100} />
      </div>
      <div className="flex justify-center pt-4 rounded-full">
        <Skeleton variant="rounded" width={180} height={60} />
      </div>
      <div className="flex justify-center pt-3 rounded-xl">
        <Skeleton variant="rounded" width={200} height={50} />
      </div>
      <div className="flex flex-col items-center pt-16 gap-3">
        <Skeleton animation="wave" height={20} width="80%" />
        <Skeleton animation="wave" height={20} width="80%" />
        <Skeleton animation="wave" height={20} width="80%" />
      </div>
      <div className="grid grid-cols-3 gap-1 place-content-center pt-[100px]">
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
      </div>
    </Stack>
  ) : (
    <Layout>
      <section className="flex flex-col justify-center items-center py-12 border-b border-neutral-300 px-10">
        <UserAvatar
          size="Xlarge"
          UserImage="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          UserName={userData?.username}
        />
        <div>
          <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl bg-gray-100">
            <FollowerModal />
            {/* <FollowerModal userFollower={userData!.Users.following} /> */}
            <FollowingModal />
          </div>
          <div className="text-gray-500">
            <div className="py-4 font-extrabold">About</div>
            <p>
              세상에 70억명의 손흥민 팬이 있다면, 나는 그들 중 한 명일 것이다.
              세상에 1억명의 손흥민 팬이 있다면., 나 또한 그들 중 한 명일
              것이다. 세상에 천만 명의 손흥민 팬이 있다면, 나는 여전히 그들 중
              한 명일 것이다. 세상에 백 명의 손흥민 팬이 있다면, 나는 아직도
              그들 중 한 명일 것이다. 세상에 한 명의 손흥민 팬이 있다면, 그
              사람은 아마도 나일 것이다. 세상에 단 한 명의 손흥민 팬도 없다면,
              나는 그제서야 이 세상에 없는 것이다. 손흥민, 나의 사랑. 손흥민,
              나의 빛. 손흥민, 나의 어둠. 손흥민, 나의 삶.손흥민, 나의 기쁨.
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
