import type { NextPage } from "next";
import Layout from "@/components/Layout";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostComment, User } from "@libs/client/types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";
import PostViewer from "@/components/PostViewer";

interface DetailPost extends Post {
  likes: number;
  isLiked: boolean;
  author: User;
  comments: PostComment[];
}

const Explore: NextPage = () => {
  const { isLoading, data, error } = useQuery<DetailPost>({
    queryKey: ["posts", "users"],
    queryFn: () =>
      axios.get("api/posts/explore").then((response) => response.data.data),
  });
  return (
    <Layout>
      {/* <div className="flex flex-wrap mx-auto p-1"></div> */}
      <div className="flex justify-center items-center h-full">
        <div>
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="w-[340px]"
          >
            {data?.map((post) => (
              <SwiperSlide key={post.id} className="bg-white shadow-xl">
                <div className="py-4 px-[1px]">
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Layout>
  );
};
export default Explore;
