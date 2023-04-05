import { useRouter } from "next/router";
import data from "../../data.json";
import Layout from "../../components/layout";
import Image from "next/image";

// mui import
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Boxes from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: HTMLImageElement;
}

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: any) => post.id === Number(id));
  console.log("post나오나? -> ", post);

  if (!post) {
    return <div>post 데이터 읽어오지 못함</div>; // post가 undefined이면 로딩 메시지를 표시
  }

  // mui import - tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //

  return (
    <Layout hasTabBar>
      <div className="flex justify-center align-middle py-6 bg-gray-200">
        <Image
          src={`/${post.image}`}
          alt={post.title}
          width="400"
          height="400"
        />
      </div>
      <div className="flex flex-col">
        {/* header info : 사용자 정보 & 구매하기 */}
        <div className="py-4 px-4 max-w-mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
          <div>
            <h4>사용자 이름</h4>
            <p>nickname</p>
          </div>
          <div>
            <button className="bg-purchase-button px-6 py-1 rounded-2xl text-white">
              <a href="https://opensea.io/">구매하기</a>
            </button>
          </div>
        </div>
        {/* post info : 좋아요, 공유, 가격 */}
        <div className="flex flex-wrap px-2 py-4">
          <div className="pr-2">
            <button className="bg-white border-black border-2 rounded-full p-2">
              좋아요 : 1
            </button>
          </div>
          <div className="mr-auto">
            <button className="bg-white border-black border-2 rounded-full p-2">
              공유하기
            </button>
          </div>
          <div>
            <button className="bg-white border-black border-2 rounded-full p-2">
              가격 : 0.05ETH
            </button>
          </div>
        </div>
        {/* post detail : 게시글 상세정보 */}
        <div className="py-4 px-4 ">
          <h1 className="font-bold text-orange-500">{post.title}</h1>
          <p>{post.body}</p>
        </div>
        {/* 댓글보기 */}
        <div>
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
        </div>
        {/* 댓글달기 */}
        <div>
          <Boxes
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Textarea
                placeholder="Try to submit with no text!"
                required
                sx={{ mb: 1 }}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Boxes>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
