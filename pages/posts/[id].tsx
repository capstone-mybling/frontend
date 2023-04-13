import { useRouter } from "next/router";
import data from "../../data.json";
import Layout from "../../components/layout";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

// mui import
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HeartIcon from "@/components/icons/HeartIcons";
import HeartFillIcon from "@/components/icons/HeartFillIcon";
import ToggleButton from "@/components/ToggleButton";
import CommentIcon from "@/components/icons/CommentIcon";
import CommentFillIcon from "@/components/icons/CommentFillIcon";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: HTMLImageElement;
};

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [like, setLike] = React.useState(false);
  const [comment, setComment] = React.useState(false);
  // const [value, setValue] = React.useState(0);

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: any) => post.id === Number(id));
  console.log("post나오나? -> ", post);

  if (!post) {
    return <div>post 데이터 읽어오지 못함</div>; // post가 undefined이면 로딩 메시지를 표시
  }

  // mui import - tabs
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  //

  const isFooterVisible = false;

  return (
    <Layout hasTabBar isFooterVisible={isFooterVisible}>
      <div className="py-4 px-4 max-w-mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-solid bg-slate-400 border-black rounded-full"></div>
            <h4>사용자 이름</h4>
          </div>
          <p>5 minutes ago</p>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center align-middle py-6 bg-gray-200">
          <Image
            src={`/${post.image}`}
            alt={post.title}
            width="400"
            height="400"
          />
        </div>
        <div className="absolute bottom-2 right-2">
          <button className="bg-black opacity-30 px-6 py-1 rounded-2xl text-white hover:opacity-70">
            <a href="https://opensea.io/">구매하기</a>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {/* header info : 사용자 정보 & 구매하기 */}
        {/* post info : 좋아요, 공유, 가격 */}
        <div className="flex px-2 py-4 justify-center gap-[150px]">
          <div className="">
            <ToggleButton
              toggled={like}
              onToggle={setLike}
              onIcon={<HeartFillIcon />}
              offIcon={<HeartIcon />}
            />
          </div>
          <div>
            <ToggleButton
              toggled={comment}
              onToggle={setComment}
              onIcon={<CommentFillIcon />}
              offIcon={<CommentIcon />}
            />
          </div>
          {/* <div className="mr-auto">
            <button className="bg-white border-black border-2 rounded-full p-2">
              공유하기
            </button>
          </div>
          <div>
            <button className="bg-white border-black border-2 rounded-full p-2">
              가격 : 0.05ETH
            </button>
          </div> */}
        </div>
        {/* post detail : 게시글 상세정보 */}
        <div className="py-4 px-4 ">
          <h1 className="font-bold text-orange-500">{post.title}</h1>
          <p>{post.body}</p>
        </div>
        {/* <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="댓글" {...a11yProps(0)} />
                <Tab label="좋아요" {...a11yProps(1)} />
                <Tab label="뭐넣지 .." {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              댓글달면 자동으로 올라가는 칸
            </TabPanel>
            <TabPanel value={value} index={1}>
              좋아요 누른사람들 뜨는 칸
            </TabPanel>
            <TabPanel value={value} index={2}>
              뭐 넣을지 모르는 칸
            </TabPanel>
          </Box>
        </div> */}
        {/* 댓글달기 */}
        <div>
          <div className="sticky bottom-0 z-20">
            <form className="flex border-t border-neutral-300 p-3">
              <input
                className="w-full ml-2 border-none outline-none"
                type="text"
                placeholder="Add a comment..."
              />
              <button className="font-bold text-sky-500 ml-2">Post</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
