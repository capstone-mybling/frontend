import React from "react";
import ResponsiveAppBar from "./appTopBar";
import { useRouter } from "next/dist/client/router";
import BottomNavBar from "./BottomNavBar";

interface PostProps {
  thumbnail?: string;
  address?: string;
  content?: string;
  AuthorName?: string;
  AuthorAvatar?: string;
  likes?: number;
}

export default function Layout({
  thumbnail,
  address,
  content,
  AuthorName,
  AuthorAvatar,
  likes,
  ...rest
}: PostProps) {
  const router = useRouter();
  return (
    <div
      className="mx-0 my-0 grid-cols-1 justify-center hover:cursor-pointer"
      onClick={() => router.push(`/posts/${address}`)}
    >
      <div>thumnail</div>
      <div>content</div>
      <div>
        meta Container
        <div>Author info wraper</div>
        <div>likes</div>
      </div>
    </div>
  );
}
