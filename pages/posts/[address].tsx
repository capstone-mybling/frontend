import React, { useState, Fragment } from "react";
import { Contract, Post, PostComment, User } from "@/libs/client/types";
import { GetServerSideProps } from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { dateCalculator } from "@libs/client/dateCalculator";
import axios from "axios";
import Image from "next/image";
import Layout from "@components/Layout";
import UserAvatar from "@/components/UserAvatar";
import LikeButton from "@/components/LikeButton";
import Comment from "@/components/Comment";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import useWeb3 from "@/hooks/useWeb3";
import { ethers } from "ethers";

interface DetailPost extends Post {
  contract: Contract;
  likes: number;
  isLiked: boolean;
  author: User;
  comments: PostComment[];
}
interface commentPostForm {
  content: string;
}
interface CommentDetail extends PostComment {
  author: {
    address: string;
    avatar: string;
    username: string;
  };
  isMine: boolean;
  likes: number;
  isLiked: boolean;
}
// issue:
// -> 라우터로 쿼리를 불러오기전에 클라이언트에서 API요청과 렌더링을 진행하여 에러가 발생 (like 모래없이 모래성 만들기)
// solution:
// -> Server Side에서 미리 쿼리를 로드해서 페이지를 렌더링할 클라이언트에게 prop으로 전해줌
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
interface HomeProps {
  address: string;
}

const Home = ({ address }: HomeProps) => {
  const queryClient = useQueryClient();
  const { marketplaceContract } = useWeb3();

  //calling API and handling data
  const { data, status } = useQuery<DetailPost>(
    "post",
    async () => await axios.get(`/api/posts/${address}`).then((res) => res.data.data)
  );
  const comments = useQuery<CommentDetail[]>(
    "comments",
    async () => await axios.get(`/api/posts/${address}/comments`).then((res) => res.data.data)
  );

  // MUI tabs
  const [tabIndex, setTabIndex] = useState("1");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
    console.log(comments);
    console.log(data);
  };

  // comments mutation using react-query
  const mutation = useMutation({
    mutationFn: (data: commentPostForm) => {
      return axios.post(`/api/posts/${address}/comments`, data);
    },
    onSuccess: (newComment) => {
      queryClient.invalidateQueries("comments");
    },
  });
  // new comment form
  const { register, handleSubmit, reset } = useForm<commentPostForm>();

  /* ********************************************** */
  //TODO: 자신의 댓글 삭제, 댓글마다 독립적인 좋아요 기능 연결
  /* ********************************************** */
  const purchase = async () => {
    const itemId = data!.contract.itemId;
    const response = await (
      await marketplaceContract.purchaseItem(BigInt(3), {
        value: ethers.parseEther(`${0.001 * 1.01}`),
      })
    ).wait();
    console.log(response);
  };

  return (
    <Layout disableFooter>
      {status !== "success" ? (
        <h2>Loading...</h2>
      ) : (
        <Fragment>
          <div className="py-4 px-4 mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
            {/* header info : 사용자 정보 & 작성시간 */}
            <div className="flex flex-1 items-center justify-between">
              <UserAvatar
                size="medium"
                UserAddr={data.authorAddress}
                UserName={data.author.username!}
                UserImage={
                  data.author.avatar
                    ? data.author.avatar
                    : "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
              />
              <button
                onClick={purchase}
                className="bg-black opacity-30 px-6 py-1 rounded-2xl text-white hover:opacity-70"
              >
                구매하기
              </button>
            </div>
          </div>
          <div className="flex justify-center align-middle py-6 ">
            <Image
              className="h-full x-auto block object-cover m-0"
              src={`${data.thumbnail}`}
              alt={data.name}
              width="2000"
              height="2000"
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
              <div className="flex items-center justify-end my-3">
                <LikeButton
                  isLiked={data.isLiked}
                  likes={data.likes}
                  address={data.address}
                />
              </div>
            </section>
            {/* post detail : 게시글 상세정보 */}
            <section className="px-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold text-2xl">{data.name}</h1>
                </div>
                <div>
                  <p className="text-gray-500">{dateCalculator(data.createdAt)}</p>
                </div>
              </div>
              <p className="my-4">{data.description}</p>
            </section>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                  >
                    <Tab
                      label={`Comments (${data.comments.length})`}
                      value="1"
                    />
                    <Tab
                      label="Sales"
                      value="2"
                    />
                    <Tab
                      label="Additional Info"
                      value="3"
                    />
                  </Tabs>
                </Box>
                <TabPanel
                  value="1"
                  sx={{ padding: 0 }}
                >
                  {/* comments section */}
                  <div className="mt-4 pt-4">
                    <ul>
                      {comments.isLoading || comments.data === undefined
                        ? null
                        : comments.data.map((comment) => (
                            <li
                              key={comment.id}
                              className="flex justify-between px-5 flex-col pb-4"
                            >
                              <Comment comment={comment} />
                            </li>
                          ))}
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ padding: 0 }}
                >
                  {/* sales section */}
                  앙냥냥
                </TabPanel>
                <TabPanel
                  value="3"
                  sx={{ padding: 0 }}
                >
                  {/* additional information section */}
                  <section className="p-2 mt-4">
                    <div className="flex justify-between">
                      <p>author</p>
                      <p>{data.author.username}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>price</p>
                      <p>{data.price}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>copies</p>
                      <p>{data.count}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>contract</p>
                      <p className="w-3/4">{data.contractAddress}</p>
                    </div>
                  </section>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Fragment>
      )}
      {tabIndex === "1" ? (
        <footer className="sticky bottom-0 bg-white z-10 border-b">
          {/* comment form */}
          <form
            className="flex border-t border-neutral-300 p-3"
            onSubmit={handleSubmit((data) => {
              mutation.mutate(data);
              reset();
            })}
          >
            <input
              className="w-full ml-2 border-none outline-none focus:ring-0"
              type="text"
              placeholder="Add a comment..."
              {...register("content", {
                required: "댓글을 입력하세요.",
              })}
            />
            <button className="font-bold text-violet-300 ml-2 transition-colors duration-300 hover:text-violet-700">
              Post
            </button>
          </form>
        </footer>
      ) : null}
    </Layout>
  );
};
export default Home;
