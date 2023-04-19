import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from "../../data.json";
import Layout from "@/components/Layout";
import Image from "next/image";
import HeartIcon from "@/components/icons/HeartIcons";
import HeartFillIcon from "@/components/icons/HeartFillIcon";
import ToggleButton from "@/components/ToggleButton";
import CommentIcon from "@/components/icons/CommentIcon";
import CommentFillIcon from "@/components/icons/CommentFillIcon";
import UserAvatar from "@/components/UserAvatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: HTMLImageElement;
};

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [like, setLike] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [commentLike, setCommentLike] = useState<boolean>(false);
  let [likeCount, setLikeCount] = useState<number>(5);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [comment]);

  const isFooterVisible = false;

  const likeUp = () => {
    setLikeCount(likeCount === 5 ? ++likeCount : --likeCount);
  };

  // MUI tabs
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [comments, setComments] = useState([
    { id: 1, content: "노하준 폼 미쳤다" },
    { id: 2, content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" },
    { id: 3, content: "왜 다들 내 사진을보고 화장실을 가는거야??;;" },
  ]);
  const [newComment, setNewComment] = useState("");

  // 댓글 추가
  const handleAddComment = () => {
    const newId = comments.length + 1;
    const newCommentObj = { id: newId, content: newComment };
    setComments([...comments, newCommentObj]);
    setNewComment("");
    // console.log(comments);
  };
  const handleBlockComment = () => {
    console.log("block!");
    // e.preventDefault();
    inputRef.current?.focus();
  };

  // 댓글 삭제
  const handleDeleteComment = (id: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // id에 해당하는 데이터를 찾아서 보여주는 로직
  const post = data.find((post: any) => post.id === Number(id));
  // console.log("post나오나? -> ", post);

  if (!post) {
    return <div>post 데이터 읽어오지 못함</div>; // post가 undefined이면 로딩 메시지를 표시
  }

  return (
    <>
      <Layout hasTabBar isFooterVisible={isFooterVisible}>
        <div className="py-4 px-4 max-w-mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
          {/* header info : 사용자 정보 & 작성시간 */}
          <div className="flex flex-1 items-center justify-between">
            <UserAvatar
              size="medium"
              UserName={"userName"}
              UserImage={
                "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
            />
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
        {/* post info : 좋아요, 댓글 */}
        <div className="flex flex-col px-2 py-4 justify-center">
          <div className="flex flex-row justify-evenly">
            <div className="flex items-center" onClick={likeUp}>
              <ToggleButton
                toggled={like}
                onToggle={setLike}
                onIcon={<HeartFillIcon />}
                offIcon={<HeartIcon />}
              />
              <span>{likeCount}</span>
            </div>
            <div>
              <ToggleButton
                toggled={comment}
                onToggle={setComment}
                onIcon={<CommentFillIcon />}
                offIcon={<CommentIcon />}
              />
            </div>
          </div>
          {/* post detail : 게시글 상세정보 */}
          <div className="py-4 px-4 ">
            <h1 className="font-bold text-orange-500">{post.title}</h1>
            <p>{post.body}</p>
          </div>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="댓글" value="1" />
                  <Tab label="거래정보?" value="2" />
                  <Tab label="NFT 정보?" value="3" />
                </Tabs>
              </Box>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <div className="mt-4 pt-4">
                  <ul>
                    {comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="flex justify-between px-5 flex-col pb-4"
                      >
                        <UserAvatar
                          size="small"
                          UserName={"userName"}
                          UserImage={
                            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                        />
                        <div className="ml-11">{comment.content}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-gray-500 text-sm ml-11">
                            5 minutes ago
                          </div>
                          <div className="flex items-center">
                            <p>10</p>
                            <ToggleButton
                              toggled={commentLike}
                              onToggle={setCommentLike}
                              onIcon={<HeartFillIcon />}
                              offIcon={<HeartIcon />}
                            />
                            <button
                              className="text-violet-200 ml-2 text-2xl"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value="2">앙냥냥</TabPanel>
              <TabPanel value="3">띵띵땅땅띵~</TabPanel>
            </TabContext>
          </Box>
          {/* 댓글 리스트 */}
        </div>
      </Layout>
      <footer className="sticky bottom-0 bg-white z-10 border-b">
        <div>
          <form
            className="flex border-t border-neutral-300 p-3"
            onSubmit={onSubmit}
          >
            <input
              className="w-full ml-2 border-none outline-none"
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setNewComment(e.target.value)}
              ref={inputRef}
              value={newComment}
            />
            <button
              className="font-bold text-violet-500 ml-2"
              onClick={() => {
                newComment === "" ? handleBlockComment() : handleAddComment();
              }}
            >
              Post
            </button>
          </form>
        </div>
      </footer>
    </>
  );
}

{
  /* Todo
- 좋아요 버튼 개별적으로 동작하게끔 
- input 태그에 아무것도 입력하지 않고 Post 누르면 댓글이 게시되지 않고 input에 포커싱 하게끔
- 음..
*/
}
