import React, { Fragment, useState } from "react";
import { Contract, Post, PostComment, User } from "@/libs/client/types";
import { GetServerSideProps } from "next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { dateCalculator } from "@libs/client/dateCalculator";
import { cls } from "@libs/client/utils";
import axios from "axios";
import Image from "next/image";
import EtheriumIcon from "@public/etherium_icon.svg";
import Etherscan from "@public/etherscan.png";
import Opensea from "@public/opensea.png";
import OnSale from "@public/onsale.svg";
import NotForSale from "@public/notforsale.svg";
import SoldOut from "@public/soldout.svg";
import Layout from "@components/Layout";
import UserAvatar from "@/components/UserAvatar";
import LikeButton from "@/components/LikeButton";
import Comment from "@/components/Comment";
import useWeb3 from "@/hooks/useWeb3";
import { ethers } from "ethers";
import Link from "next/link";
import DetailLoading from "@/components/DetailLoading";

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

enum TabType {
  COMMENTS = "comments",
  SALES = "sales",
  ADDITIONAL = "additional",
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
  const { account, marketplaceContract } = useWeb3();

  //calling API and handling data
  const { data: postData, isLoading: postIsLoading } = useQuery<DetailPost>({
    queryKey: ["post", address],
    queryFn: async () => await axios.get(`/api/posts/${address}`).then((res) => res.data.data),
  });

  const { data: commentsData, isLoading: commentsIsLoading } = useQuery<CommentDetail[]>({
    queryKey: ["postComments", address],
    queryFn: async () =>
      await axios.get(`/api/posts/${address}/comments`).then((res) => res.data.data),
  });

  // MUI tabs
  const [tabIndex, setTabIndex] = useState<TabType>(TabType.COMMENTS);

  // comments mutation using react-query
  const mutation = useMutation({
    mutationFn: (data: commentPostForm) => {
      return axios.post(`/api/posts/${address}/comments`, data);
    },
    onSuccess: (newComment) => {
      queryClient.invalidateQueries(["postComments", address]);
    },
  });
  // new comment form
  const { register, handleSubmit, reset } = useForm<commentPostForm>();

  /* ********************************************** */
  //TODO: 자신의 댓글 삭제, 댓글마다 독립적인 좋아요 기능 연결
  /* ********************************************** */
  const purchase = async () => {
    const itemId = postData!.contract.itemId;
    const response = await (
      await marketplaceContract.purchaseItem(BigInt(itemId), {
        value: ethers.parseEther((postData!.price * 1.01).toString()),
      })
    ).wait();
  };
  //only for test
  const [saleInfo, setSaleInfo] = useState<number>(0);

  if (postIsLoading || commentsIsLoading) {
    return <DetailLoading />;
  }
  return (
    <Layout disableFooter>
      <Fragment>
        <div className="py-4 px-4 mx-auto shadow-sm space-y-2 flex flex-row items-start space-x-10 justify-between">
          {/* header info : 사용자 정보 & 작성시간 */}
          <div className="flex flex-1 items-center justify-between">
            <UserAvatar
              size="medium"
              UserAddr={postData!.authorAddress}
              UserName={postData!.author.username || ""}
              UserImage={postData!.author.avatar || ""}
              isMine={account === postData!.authorAddress}
            />
            <button
              className=" bg-amber-800  rounded-full px-1 text-white"
              onClick={() => setSaleInfo((saleInfo + 1) % 3)}
            >
              change saleInfo
            </button>
            <button
              onClick={purchase}
              className={cls(
                "bg-black opacity-30 px-6 py-1 rounded-2xl text-white",
                saleInfo > 0
                  ? "pointer-events-none disabled"
                  : "hover:opacity-70 hover:bg-violet-800 transition duration-300"
              )}
            >
              구매하기
            </button>
          </div>
        </div>
        <div className="relative flex justify-center align-middle mb-3 ">
          <Image
            className="h-full x-auto block object-cover m-0"
            src={`${postData!.thumbnail}`}
            alt={postData!.name}
            width="2000"
            height="2000"
          />
          <div className="absolute right-0 translate-x-[3px] -translate-y-[9px]">
            {saleInfo === 0 ? <OnSale /> : saleInfo === 1 ? <SoldOut /> : <NotForSale />}
          </div>
        </div>
        {/* post info : 좋아요, 댓글 */}
        <div className="flex flex-col px-2 justify-center">
          <div className="flex items-center space-x-2 ml-1">
            <EtheriumIcon />
            <div className="flex">
              <span>{postData!.price}</span>
              <span className=" text-cyan-950 font-extrabold">&nbsp;GeorliETH</span>
            </div>
          </div>
          <section className="flex justify-between mb-4">
            <div className="px-1 flex space-x-2 items-center">
              <div className="inline-block rounded-full ring-1 ring-gray-200 bg-gray-300 w-6 h-6"></div>
              <span className="text-sm font-extrabold text-gray-500">Current Owner</span>
              <span className="text-sm font-extrabold">hazzun</span>
            </div>
            <div className="flex items-center justify-end my-3">
              <LikeButton
                isLiked={postData!.isLiked}
                likes={postData!.likes}
                address={postData!.address}
              />
            </div>
          </section>
          {/* post detail : 게시글 상세정보 */}
          <section className="px-2">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold text-2xl">{postData!.name}</h1>
              </div>
              <div>
                <p className="text-gray-500">{dateCalculator(postData!.createdAt)}</p>
              </div>
            </div>
            <p className="my-4">{postData!.description}</p>
          </section>
          <div className="w-full">
            <div className="w-full my-5 flex justify-evenly align-middle">
              <button
                className={`px-4 py-2 ${
                  tabIndex === TabType.COMMENTS
                    ? "text-violet-500 font-extrabold"
                    : "text-violet-300  font-base"
                }`}
                onClick={() => setTabIndex(TabType.COMMENTS)}
              >
                댓글
                <p
                  className={`${
                    tabIndex === TabType.COMMENTS
                      ? "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                      : ""
                  }`}
                ></p>
              </button>
              <button
                className={`px-4 py-2 ${
                  tabIndex === TabType.SALES
                    ? "text-violet-500 font-extrabold"
                    : "text-violet-300 font-base"
                }`}
                onClick={() => setTabIndex(TabType.SALES)}
              >
                판매 정보
                <p
                  className={`${
                    tabIndex === TabType.SALES
                      ? "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                      : ""
                  }`}
                ></p>
              </button>
              <button
                className={`px-4 py-2 ${
                  tabIndex === TabType.ADDITIONAL
                    ? "text-violet-500 font-extrabold"
                    : "text-violet-300 "
                }`}
                onClick={() => setTabIndex(TabType.ADDITIONAL)}
              >
                추가 정보
                <p
                  className={`${
                    tabIndex === TabType.ADDITIONAL
                      ? "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                      : ""
                  }`}
                ></p>
              </button>
            </div>
            <div className="pb-20">
              {tabIndex === TabType.COMMENTS && (
                //  {/* comments section */}
                <div className="mt-4 pt-4">
                  <ul>
                    {commentsIsLoading ||
                      (commentsData &&
                        commentsData.map((comment) => (
                          <li
                            key={comment.id}
                            className="flex justify-between px-5 flex-col pb-4"
                          >
                            <Comment comment={comment} />
                          </li>
                        )))}
                  </ul>
                </div>
              )}
              {tabIndex === TabType.SALES && <p>판매정보</p>}
              {tabIndex === TabType.ADDITIONAL && (
                <section className="p-2 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[17px]">author</p>
                    <p>{postData!.author.username}</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[17px]">price</p>
                    <div className="flex space-x-2 items-center">
                      <EtheriumIcon className="w-4" />
                      <p>{postData!.price}&nbsp;GeorliETH</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[17px]">copies</p>
                    <p>{postData!.count}</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center my-1">
                    <p className="font-bold text-[17px]">tracnsaction</p>
                    <Link
                      passHref
                      legacyBehavior
                      href={`https://goerli.etherscan.io/tx/${postData!.contractAddress}`}
                    >
                      <a target="_blank">
                        <Image
                          src={Etherscan}
                          alt="Link to contract information about this NFT contract"
                          width={250}
                          height={1}
                        />
                      </a>
                    </Link>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center my-1">
                    <p className="font-bold text-[17px]">minting contract</p>
                    <Link
                      passHref
                      legacyBehavior
                      href={`https://goerli.etherscan.io/address/0x7d56062dd1c44c6cb784a1c2ab1ec3d14ea84e13`}
                    >
                      <a target="_blank">
                        <Image
                          src={Etherscan}
                          alt="Link to contract information about this NFT contract"
                          width={250}
                          height={1}
                        />
                      </a>
                    </Link>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center my-1">
                    <p className="font-bold text-[17px]">see more</p>
                    <Link
                      passHref
                      legacyBehavior
                      href={`https://testnets.opensea.io/assets/goerli/0x7d56062dd1c44c6cb784a1c2ab1ec3d14ea84e13/${
                        postData!.contract.mintId + 1
                      }`}
                    >
                      <a target="_blank">
                        <Image
                          src={Opensea}
                          alt="Link to contract information about this NFT"
                          width={250}
                          height={1}
                        />
                      </a>
                    </Link>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </Fragment>
      {tabIndex === TabType.COMMENTS && (
        <footer className="fixed w-[500px] bottom-0 bg-white z-10 border-b">
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
      )}
    </Layout>
  );
};
export default Home;
