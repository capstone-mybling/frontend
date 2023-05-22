import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { FileType } from "@libs/client/types";
import baseResponse from "@libs/server/response";
import getRedisClient from "@libs/server/redis";

interface UploadForm {
  name: string;
  externalUrl: string;
  description: string;
  file: any;
  fileType: FileType;
  properties: {
    [key: string]: string;
  };
  count: number;
  price: number;
}

/**
 * 게시글 목록 조회 및 생성
 * @param request
 * @param response
 */
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { user } = request.session;
  const redis = await getRedisClient();

  const findPosts = await client.post.findMany({
    include: {
      author: true,
      comments: true,
    },
  });

  const posts = await Promise.all(
    findPosts.map(async (post) => {
      return {
        ...post,
        likes: await redis.sCard(`posts:${post.address}:likes`),
        isLiked: await redis.sIsMember(
          `posts:${post.address}:likes`,
          user!.address
        ),
      };
    })
  );

  console.log(posts);

  return baseResponse(response, {
    success: true,
    data: posts,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
