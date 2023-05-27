import type { NextPage } from "next";
import Layout from "@/components/Layout";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostComment, User } from "@libs/client/types";
import Image from "next/image";
import Link from "next/link";

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
import ExploreLoading from "@/components/ExploreLoading";
import useWeb3 from "@/hooks/useWeb3";

interface DetailPost extends Post {
  likes: number;
  isLiked: boolean;
  author: User;
  comments: PostComment[];
}

const Explore: NextPage = () => {
  const { account } = useWeb3();
  const { isLoading, data, error } = useQuery<DetailPost[]>({
    queryKey: ["posts", "users"],
    queryFn: () =>
      axios.get("api/posts/explore").then((response) => response.data.data),
  });
  return isLoading || data == undefined ? (
    <ExploreLoading />
  ) : (
    <Layout>
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
          <SwiperSlide
            key={post.id}
            className="shadow-2xl h-screen aspect-auto"
          >
            <div className="relative">
              <Thumbnail
                thumbnail={post.thumbnail}
                address={post.address}
                option="Explore"
                link={post.address}
              />
              <div className="flex gap-1 flex-col absolute bottom-3 left-3">
                <div className="flex gap-2 items-center">
                  {post.author.address === account ? (
                    <Link href={`/profile`}>
                      <Image
                        className="inline-block rounded-full ring-2 ring-gray-200 aspect-square"
                        src={post.author.avatar!}
                        alt="profile image"
                        width={32}
                        height={32}
                      />
                    </Link>
                  ) : (
                    <Link href={`/profile/${post.author.address}`}>
                      <Image
                        className="inline-block rounded-full ring-2 ring-gray-200 aspect-square"
                        src={post.author.avatar!}
                        alt="profile image"
                        width={32}
                        height={32}
                      />
                    </Link>
                  )}

                  <Link href={`/posts/${post.address}`}>
                    <div className="text-2xl font-semibold text-white">
                      {post.name}
                    </div>
                  </Link>
                </div>
                <div className="text-[15px] text-neutral-100">
                  {post.price} GoerliETH
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
};
export default Explore;
