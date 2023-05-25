import type { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";
// import {init, pickChainUrl} from "etherscan-api";
// import {
//     getTokenNFTTransaction,
//     getTransactionByHash,
//     getTransactionCount,
//     getTransactionReceipt
// } from "@libs/server/etherscan";

/**
 * @description 댓글 수정 및 삭제
 * @param request
 * @param response
 */
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { address } = request.query;
  const { user } = request.session;

  const findPost = await client.post.findUnique({
    where: {
      address: address as string,
    },
    include: {
      author: true,
      transfers: true,
      contract: true,
      comments: {
        include: {
          author: {
            select: {
              address: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  // 만약 address 에 맞는 포스트가 없으면 에러
  if (!findPost) {
    return baseResponse(response, {
      statusCode: 404,
      success: false,
      error: {
        message: "not found post",
        errorMessage: "포스트가 존재하지 않습니다. 다시 입력해주세요.",
        errorCode: ErrorCode.ITEM_DOES_NOT_EXIST,
      },
    });
  } else if (
    (request.method === "PATCH" || request.method === "DELETE") &&
    findPost.authorAddress !== user!.address
  ) {
    // 만약 포스트의 작성자가 현재 로그인한 유저가 아니면 에러
    return baseResponse(response, {
      statusCode: 403,
      success: false,
      error: {
        message: "not author",
        errorMessage: "포스트 작성자가 아닙니다.",
        errorCode: ErrorCode.PERMISSION_DENIED,
      },
    });
  }

  if (request.method === "GET") {
    const redis = await getRedisClient();
    const post = {
      ...findPost,
      likes: await redis.sCard(`posts:${findPost.address}:likes`),
      isLiked: await redis.sIsMember(
        `posts:${findPost.address}:likes`,
        user!.address
      ),
    };

    let currentOwner = null;
    if (post.transfers) {
      const owner = await client.user.findUnique({
        where: {
          address: post?.transfers?.pop()?.toAddress?.toLowerCase() ?? "",
        },
      });

      if (owner) {
        currentOwner = {
          address: owner.address,
          username: owner.username,
          avatar: owner.avatar,
        };
      }
    }

    return baseResponse(response, {
      statusCode: 200,
      success: true,
      data: {
        ...post,
        currentOwner,
      },
    });
  } else if (request.method === "PATCH") {
    // 수정이 필요한지 확인
  } else if (request.method === "DELETE") {
    // 댓글 삭제
    await client.post.delete({
      where: {
        address: findPost.address,
      },
    });

    // 파일과 NFT 를 삭제해야하는가...?

    return baseResponse(response, {
      statusCode: 204,
      success: true,
      data: null,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["GET", "PATCH", "DELETE"],
    handler,
    isPrivate: true,
  })
);
