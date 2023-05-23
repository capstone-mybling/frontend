import type { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import ErrorCode from "@libs/server/error_code";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  if (!request.session.user) {
    return;
  }
  const { address } = request.session.user;

  const findUser = await client.user.findUnique({
    where: {
      address,
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

  const updatedUser = await client.user.update({
    where: {
      address,
    },
    data: {
      isApproved: true,
    },
  });

  return baseResponse(response, {
    success: true,
    data: updatedUser,
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
