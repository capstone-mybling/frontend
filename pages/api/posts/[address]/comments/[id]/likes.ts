import { NextApiRequest, NextApiResponse } from "next";
import getRedisClient from "@libs/server/redis";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";

/**
 * 댓글 좋아요 생성, 삭제
 * @param request
 * @param response
 */
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { address, id } = request.query;
  const { user } = request.session;
  const redis = await getRedisClient();

  if (!id) {
    return baseResponse(response, {
      statusCode: 400,
      success: false,
      error: {
        errorMessage: "ID가 필요합니다.",
        errorCode: ErrorCode.ID_IS_REQUIRED,
      },
    });
  } else if (!address) {
    return baseResponse(response, {
      statusCode: 400,
      success: false,
      error: {
        errorMessage: "address가 필요합니다.",
        errorCode: ErrorCode.ADDRESS_IS_REQUIRED,
      },
    });
  }

  const findComment = await client.postComment.findUnique({
    where: {
      id: +id,
    },
  });

  const existLike: boolean = await redis
    .sMembers(`posts:comments:${id}:likes`)
    .then((likes) => likes.some((like) => like === user!.address));

  if (request.method === "POST") {
    if (existLike) {
      baseResponse(response, {
        statusCode: 400,
        success: false,
        error: {
          errorMessage: "좋아요가 이미 존재합니다. 다시 확인해주세요.",
          errorCode: ErrorCode.RELATIONSHIP_ALREADY_EXISTS,
        },
      });
    }

    // 실제 좋아요 생성 처리 로직
    await client.postCommentLike.create({
      data: {
        userAddress: user!.address,
        commentId: +findComment!.id,
      },
    });

    await redis.sAdd(`posts:comments:${id}:likes`, user!.address);

    baseResponse(response, {
      statusCode: 201,
      success: true,
      data: null,
    });
  } else if (request.method === "DELETE") {
    if (!existLike) {
      baseResponse(response, {
        statusCode: 400,
        success: false,
        error: {
          errorMessage: "좋아요가 존재하지 않습니다. 다시 확인해주세요.",
          errorCode: ErrorCode.RELATIONSHIP_NOT_FOUND,
        },
      });
    } else {
      // 실제 좋아요 삭제 처리 로직
      await client.postCommentLike.delete({
        where: {
          commentId_userAddress: {
            commentId: +id,
            userAddress: user!.address,
          },
        },
      });

      await redis.sRem(`posts:comments:${id}:likes`, user!.address);

      baseResponse<null>(response, {
        statusCode: 204,
        success: true,
        data: null,
      });
    }
  }
};

export default withApiSession(
  withHandler({
    methods: ["POST", "DELETE"],
    handler,
    isPrivate: true,
  })
);
