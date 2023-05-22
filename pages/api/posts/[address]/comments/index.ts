import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";

/**
 * 댓글 생성 및 조회
 * @param request
 * @param response
 */
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { address } = request.query;
  const { user } = request.session;
  const redis = await getRedisClient();

  if (request.method === "GET") {
    // 전체 댓글 조회
    const findPostComments = await client.postComment.findMany({
      where: {
        postAddress: address as string,
      },
      include: {
        author: {
          select: {
            address: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    const commentsWithLikes = await Promise.all(
      findPostComments.map(async (comment) => {
        return {
          ...comment,
          likes: await redis.sCard(`posts:comments:${findPost.address}:likes`),
          isLiked:
            user &&
            (await redis.sIsMember(
              `posts:comments:${findPost.address}:likes`,
              user!.address
            )),
          isMine: comment.authorAddress === user!.address,
        };
      })
    );

    return baseResponse(response, {
      statusCode: 200,
      success: true,
      data: commentsWithLikes,
    });
  } else if (request.method === "POST") {
    // 댓글 생성
    const { content } = request.body;

    if (!content) {
      return baseResponse(response, {
        statusCode: 400,
        success: false,
        error: {
          errorMessage: "댓글 내용을 입력해주세요.",
          errorCode: ErrorCode.CONTENT_DOES_NOT_EXIST,
        },
      });
    }

    const newPostComment = await client.postComment.create({
      data: {
        content,
        postAddress: address as string,
        authorAddress: user!.address,
      },
    });

    return baseResponse(response, {
      statusCode: 201,
      success: true,
      data: newPostComment,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
