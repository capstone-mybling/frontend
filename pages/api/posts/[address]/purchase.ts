import type { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import ErrorCode from "@libs/server/error_code";
import { PostStatus } from "@prisma/client";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  if (!request.session.user) {
    return;
  }
  const { postAddress } = request.query;
  const { userAddress } = request.session.user;

  const findUser = await client.user.findUnique({
    where: {
      userAddress,
    },
    include: {
      posts: true,
    },
  });

  const findPost = await client.post.findUnique({
    where: {
      address: postAddress as string,
    },
  });

  if (!findPost) {
    return baseResponse(response, {
      success: false,
      error: {
        errorCode: ErrorCode.ITEM_DOES_NOT_EXIST,
        errorMessage: "게시글을 찾을 수 없습니다.",
      },
    });
  }

  if (!findUser) {
    return baseResponse(response, {
      success: false,
      error: {
        errorCode: ErrorCode.ITEM_DOES_NOT_EXIST,
        errorMessage: "유저를 찾을 수 없습니다.",
      },
    });
  }

  await client.transfer.create({
    data: {
      fromAddress: process.env.MARKET_PLACE_CONTRACT_ADDRESS,
      toAddress: userAddress,
      contractAddress: process.env.MARKET_PLACE_CONTRACT_ADDRESS,
      method: "purchase",
      postAddress: postAddress,
    },
  });

  const updatedPost = await client.post.update({
    where: {
      address: postAddress as string,
    },
    data: {
      status: PostStatus.SOLD_OUT,
      isSold: true,
    },
  });

  return baseResponse(response, {
    statusCode: 200,
    success: true,
    data: updatedPost,
  });
};

export default withApiSession(
  withHandler({
    methods: ["PATCH"],
    handler,
    isPrivate: true,
  })
);
