import React, { useRef, useState, useEffect, Fragment } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
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

const Home: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const [like, setLike] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [commentLike, setCommentLike] = useState<boolean>(false);
  let [likeCount, setLikeCount] = useState<number>(5);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [comment]);

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
    { id: 3, content: "인절미슈페너에 샷추가" },
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
  return (
    <Layout disableFooter>
      {!post ? (
        <h2>Loading...</h2>
      ) : (
        // Fragment태그는 <>(빈 태그)와 같은 기능을 가진 태그라고 함 - by 준수형
        <Fragment>
          <div className="py-4 px-4 mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
            {/* header info : 사용자 정보 & 작성시간 */}
            <div className="flex flex-1 items-center justify-between">
              <UserAvatar
                size="medium"
                UserName={"userName"}
                UserImage={
                  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
              />
              <button className="bg-black opacity-30 px-6 py-1 rounded-2xl text-white hover:opacity-70">
                <a href="https://opensea.io/">구매하기</a>
              </button>
            </div>
          </div>
          <div className="flex justify-center align-middle py-6 bg-gray-200">
            <Image
              src={`/${post.image}`}
              alt={post.title}
              width="400"
              height="400"
            />
          </div>
          {/* post info : 좋아요, 댓글 */}
          <div className="flex flex-col px-2 py-4 justify-center">
            <section className="flex justify-between mb-4">
              <div className="px-1 flex space-x-2 items-center">
                <div className="inline-block rounded-full ring-1 ring-gray-200 bg-gray-300 w-6 h-6"></div>
                <span className="text-sm font-extrabold text-gray-500">Current Owner</span>
                <span className="text-sm font-extrabold">hazzun</span>
              </div>
              <div
                className="flex items-center justify-end my-3"
                onClick={likeUp}
              >
                <span>{likeCount}</span>
                <ToggleButton
                  toggled={like}
                  onToggle={setLike}
                  onIcon={<HeartFillIcon />}
                  offIcon={<HeartIcon />}
                />
              </div>
            </section>
            {/* post detail : 게시글 상세정보 */}
            <section className="px-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold text-2xl">title????</h1>
                </div>
                <div>
                  <p className="text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <p className="my-4">
                책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문
                일이며, 그들은 대부분 이상한 모험을 즐기며 시간을 보냅니다.책읽는 심슨이 있습니다.
                그러나, 책을 읽는 것은 심슨 가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한
                모험을 즐기며 시간을 보냅니다.책읽는 심슨이 있습니다. 그러나, 책을 읽는 것은 심슨
                가족 중에서는 극적으로 드문 일이며, 그들은 대부분 이상한 모험을 즐기며 시간을
                보냅니다.
              </p>
            </section>
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
                    <Tab
                      label="Comments"
                      value="1"
                    />
                    <Tab
                      label="Sales"
                      value="2"
                    />
                    <Tab
                      label="Ownership"
                      value="3"
                    />
                    <Tab
                      label="Additional Info"
                      value="4"
                    />
                  </Tabs>
                </Box>
                <TabPanel
                  value="1"
                  sx={{ padding: 0 }}
                >
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
                            <div className="text-gray-500 text-sm ml-11">5 minutes ago</div>
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
                  {/* footer의 위치는 어차피 고정이기 때문에 어디 있어도 똑같아서 댓글 탭 안에 포함 시킴 */}
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
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ padding: 0 }}
                >
                  앙냥냥
                </TabPanel>
                <TabPanel
                  value="3"
                  sx={{ padding: 0 }}
                >
                  띵띵땅땅띵~
                </TabPanel>
                <TabPanel
                  value="4"
                  sx={{ padding: 0 }}
                >
                  <section className="p-2 mt-4">
                    <div className="flex justify-between">
                      <p>1</p>
                      <p>test</p>
                    </div>
                    <div className="flex justify-between">
                      <p>fsdlndlsnf</p>
                      <p>oprqwekopqjwel;kmads</p>
                    </div>
                    <div className="flex justify-between">
                      <p>fsdlndlsnf</p>
                      <p>oprqwekopqjwel;kmads</p>
                    </div>
                    <div className="flex justify-between">
                      <p>fsdlndlsnf</p>
                      <p>oprqwekopqjwel;kmads</p>
                    </div>
                  </section>
                </TabPanel>
              </TabContext>
            </Box>
            {/* 댓글 리스트 */}
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

{
  /* Todo
- 댓글 좋아요 버튼 개별적으로 동작하게끔 
- 음..
*/
}
export default Home;
