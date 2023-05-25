import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { user } = request.session;
  const redis = await getRedisClient();
  const { keyword } = request.query;

  if (!keyword) {
    return baseResponse(response, {
      success: false,
      error: {
        errorCode: ErrorCode.INVALID_INPUT_VALUE,
        errorMessage: "검색어를 입력해주세요.",
      },
    });
  }

  const users = await client.user.findMany({
    where: {
      username: {
        contains: keyword,
      },
    },
    select: {
      username: true,
      address: true,
      avatar: true,
    },
  });
  const usersWithFollowing = await Promise.all(
    users.map(async (findUser) => {
      return {
        ...findUser,
        isFollowing: await redis.sIsMember(
          `user:${user?.address}:followings`,
          findUser.address
        ),
      };
    })
  );

  return baseResponse(response, {
    success: true,
    data: usersWithFollowing,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
