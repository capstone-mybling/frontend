import type { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import { User } from "@libs/client/types";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";

interface UserWithFollow extends User {
  followings: string[];
  followers: string[];
}

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { address } = request.query;

  if (!address) {
    baseResponse(response, {
      success: false,
      error: {
        message: "not found address",
        errorMessage: "주소가 존재하지 않습니다. 다시 입력해주세요.",
        errorCode: ErrorCode.ADDRESS_IS_REQUIRED,
      },
    });
  }

  const findUser = await client.user.findUnique({
    where: {
      address: address as string,
    },
    include: {
      posts: true,
    },
  });

  if (!findUser) {
    return baseResponse(response, {
      success: false,
      error: {
        errorCode: ErrorCode.ITEM_DOES_NOT_EXIST,
        errorMessage: "유저를 찾을 수 없습니다.",
      },
    });
  }

  const redis = await getRedisClient();
  const userFollowers = await redis.sMembers(`user:${address}:followers`);
  const userFollowings = await redis.sMembers(`user:${address}:followings`);

  const userFollowerWithInfo = await Promise.all(
    userFollowers.map(async (userAddress) => {
      const user = await client.user.findUnique({
        where: {
          address: userAddress,
        },
      });
      if (!user) return;
      return {
        address: userAddress,
        avatar: user.avatar,
        username: user.username,
      };
    })
  );
  const userFollowingWithInfo = await Promise.all(
    userFollowings.map(async (userAddress) => {
      const user = await client.user.findUnique({
        where: {
          address: userAddress,
        },
      });
      if (!user) return;
      return {
        address: userAddress,
        avatar: user.avatar,
        username: user.username,
      };
    })
  );

  baseResponse(response, {
    success: true,
    data: {
      ...findUser,
      followers: userFollowerWithInfo,
      followings: userFollowingWithInfo,
    },
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
