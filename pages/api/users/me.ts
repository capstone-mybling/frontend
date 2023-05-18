import type { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import getRedisClient from "@libs/server/redis";
import ErrorCode from "@libs/server/error_code";
import parsedFormData from "@libs/server/parseFormData";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  // TODO: 해결 방법 찾아보기
  if (!request.session.user) {
    return;
  }
  const { address } = request.session.user;

  const findUser = await client.user.findUnique({
    where: {
      address,
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

  const userInfo = {
    ...findUser,
    followers: userFollowerWithInfo,
    followings: userFollowingWithInfo,
  };

  if (request.method === "GET") {
    return baseResponse(response, {
      success: true,
      data: userInfo,
    });
  } else if (request.method === "PATCH") {
    const formData = await parsedFormData(request);
    console.log(formData.files.avatar);
    const avatar = fs.readFileSync(formData.files.avatar.filepath);
    const avatarPath = `/media/avatar/${
      formData.files.avatar.newFilename
    }.${formData.files.avatar.originalFilename.split(".").pop()}`;
    fs.writeFileSync(avatarPath, avatar);

    fs.unlinkSync(formData.files.avatar.filepath);

    const { username, description } = formData.fields;

    const updatedUser = await client.user.update({
      where: {
        address,
      },
      data: {
        username,
        avatar: avatarPath,
        description,
      },
    });

    return baseResponse(response, {
      success: true,
      data: {
        ...updatedUser,
        followers: userFollowerWithInfo,
        followings: userFollowingWithInfo,
      },
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["GET", "PATCH"],
    handler,
    isPrivate: true,
  })
);
