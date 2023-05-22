import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";

/**
 * 댓글 수정, 삭제
 * @param request
 * @param response
 */
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { id } = request.query;
  const { user } = request.session;

  if (!id) {
    return baseResponse(response, {
      statusCode: 400,
      success: false,
      error: {
        errorMessage: "ID가 필요합니다.",
        errorCode: ErrorCode.ID_IS_REQUIRED,
      },
    });
  }

  const findComment = await client.postComment.findUnique({
    where: {
      id: +id,
    },
  });

  if (!findComment) {
    return baseResponse(response, {
      statusCode: 404,
      success: false,
      error: {
        errorMessage: "댓글이 존재하지 않습니다.",
        errorCode: ErrorCode.ITEM_DOES_NOT_EXIST,
      },
    });
  } else if (findComment.authorAddress !== user!.address) {
    return baseResponse(response, {
      statusCode: 403,
      success: false,
      error: {
        errorMessage: "댓글 작성자가 아닙니다.",
        errorCode: ErrorCode.PERMISSION_DENIED,
      },
    });
  }

  if (request.method === "PATCH") {
    // 댓글 수정
    const { content } = request.body;

    const comment = await client.postComment.update({
      data: {
        content,
      },
      where: {
        id: +id,
      },
    });

    return baseResponse(response, {
      statusCode: 200,
      success: true,
      data: comment,
    });
  } else if (request.method === "DELETE") {
    await client.postComment.update({
      data: {
        isDeleted: true,
      },
      where: {
        id: +id,
      },
    });

    return baseResponse(response, {
      statusCode: 204,
      success: true,
      data: null,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["PATCH", "DELETE"],
    handler,
    isPrivate: true,
  })
);
