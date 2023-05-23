import type { NextPage } from "next";
import Layout from "@/components/Layout";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostComment, User } from "@libs/client/types";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
// import required modules
import { EffectCards, EffectCreative } from "swiper";
import { EffectCube, Pagination } from "swiper";
import Thumbnail from "@/components/Thumbnail";
import PostViewer from "@/components/PostViewer";

interface DetailPost extends Post {
  likes: number;
  isLiked: boolean;
  author: User;
  comments: PostComment[];
}

const Explore: NextPage = () => {
  const { isLoading, data, error } = useQuery<DetailPost[]>({
    queryKey: ["posts", "users"],
    queryFn: () =>
      axios.get("api/posts/explore").then((response) => response.data.data),
  });
  return (
    <Layout>
      {/* <div className="flex justify-center items-center flex-1"> */}
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper2"
      >
        {data?.map((post) => (
          <SwiperSlide key={post.id} className="shadow-2xl">
            <div className="relative">
              {/* <div className="absolute top-3 left-3"> */}
              {/* </div> */}
              <Thumbnail
                thumbnail={post.thumbnail}
                address={post.address}
                option="Explore"
                link={post.address}
              />
              <div className="flex gap-1 flex-col absolute bottom-3 left-3">
                <div className="flex gap-2 items-center">
                  <Image
                    className="inline-block rounded-full ring-2 ring-gray-200 aspect-square"
                    src={post.author.avatar!}
                    alt="profile image"
                    width={32}
                    height={32}
                  />
                  <div className="text-2xl font-semibold text-white">
                    {post.name}
                  </div>
                </div>
                <div className="text-sm text-neutral-200">
                  {post.price} GoerliETH
                </div>
              </div>
            </div>
            {/* <div className="py-4 px-[1px]">
                <PostViewer
                  key={post.id}
                  thumbnail={post.thumbnail}
                  address={post.address}
                  UserAddr={post.authorAddress}
                  content={post.description}
                  UserName={post.author.username}
                  UserImage={post.author.avatar}
                  likes={post.likes}
                  ownerName="KKKSSSGGG"
                  ownerImage=""
                  isLiked={post.isLiked}
                />
              </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
    </Layout>
  );
};
export default Explore;
