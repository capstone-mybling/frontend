import type {NextApiRequest, NextApiResponse} from 'next'
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";

/**
 * @description 댓글 수정 및 삭제
 * @param request
 * @param response
 */
const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {address} = request.query;
    const {user} = request.session;

    const findPost = await client.post.findUnique({
        where: {
            address: address as string,
        }
    });

    // 만약 address 에 맞는 포스트가 없으면 에러
    if (!findPost) {
        baseResponse(response, {
            statusCode: 404,
            success: false,
            error: {
                message: "not found post",
                errorMessage: "포스트가 존재하지 않습니다. 다시 입력해주세요.",
                errorCode: ErrorCode.ITEM_DOES_NOT_EXIST,
            }
        })
    } else if (findPost.authorAddress !== user!.address) {
        // 만약 포스트의 작성자가 현재 로그인한 유저가 아니면 에러
        baseResponse(response, {
            statusCode: 403,
            success: false,
            error: {
                message: "not author",
                errorMessage: "포스트 작성자가 아닙니다.",
                errorCode: ErrorCode.PERMISSION_DENIED,
            }
        })
    }

    if (request.method === "PATCH") {
        // 수정이 필요한지 확인
    } else if (request.method === "DELETE") {
        // 댓글 삭제
        await client.post.delete({
            where: {
                address: findPost.address
            }
        });

        // 파일과 NFT 를 삭제해야하는가...?

        return baseResponse(response, {
            statusCode: 204,
            success: true,
            data: null
        });
    }
}

export default withApiSession(
    withHandler({
        methods: ["PATCH", "DELETE"],
        handler,
        isPrivate: true,
    })
);