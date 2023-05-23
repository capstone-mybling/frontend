// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import client from "@/libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import ErrorCode from "@libs/server/error_code";
import generateIdenticon from "@libs/server/identicon";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { address } = request.body;

  // address 가 없으면 에러
  if (!address) {
    response.json({
      success: false,
      message: "address is required",
    });
    return;
  }

  const lowerCaseAddress = address.toLowerCase();

  // 이미 로그인 되어있으면 에러
  if (
    request.session.user &&
    request.session.user.address !== lowerCaseAddress
  ) {
    request.session.destroy();
  }

  const findUser = await client.user.upsert({
    where: {
      address: lowerCaseAddress,
    },
    update: {},
    create: {
      address: lowerCaseAddress,
      avatar: generateIdenticon(lowerCaseAddress),
    },
  });

  if (!findUser) {
    return response.json({
      success: false,
      message: "not found user",
      errorCode: ErrorCode.USER_NOT_FOUND,
    });
  }

  // 찾은 유저의 정보를 세션에 저장
  request.session.user = {
    id: findUser.id,
    address: findUser.address,
  };

  await request.session.save();

  response.status(200).json({
    success: true,
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
