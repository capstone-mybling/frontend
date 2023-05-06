import {NextApiRequest, NextApiResponse} from "next";
import getRedisClient from "@libs/server/redis";
import client from "@libs/server/client";
import {withApiSession} from "@libs/server/withSession";
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
    const {address, id} = request.query;
    const {user} = request.session;
    const redis = await getRedisClient();

    const findPost = await client.post.findUnique({
        where: {
            address: address as string,
        }
    });

    const existLike: boolean = await redis.sMembers(`post:comment:${id}:likes`)
        .then(likes => likes.some((like) => like === user.address));

    if (request.method === "POST") {
        if (existLike) {
            baseResponse(response, {
                statusCode: 400,
                success: false,
                error: {
                    errorMessage: "좋아요가 이미 존재합니다. 다시 확인해주세요.",
                    errorCode: ErrorCode.RELATIONSHIP_ALREADY_EXISTS
                }
            })
        }

        // 실제 좋아요 생성 처리 로직
        await client.postCommentLike.create({
            data: {
                userId: user.id,
                commentId: findPost?.id as number,
            }
        });
        await redis.sAdd(`post:comment:${id}:likes`, user.address);

        baseResponse(response, {
            statusCode: 201,
            success: true,
            data: null,
        })

    } else if (request.method === "DELETE") {
        if (!existLike) {
            baseResponse(response, {
                statusCode: 400,
                success: false,
                error: {
                    errorMessage: "좋아요가 존재하지 않습니다. 다시 확인해주세요.",
                    errorCode: ErrorCode.RELATIONSHIP_NOT_FOUND
                }
            })
        }

        // 실제 좋아요 삭제 처리 로직
        await client.postCommentLike.delete({
            where: {
                commentId_userId: {
                    commentId: +id,
                    userId: user.id,
                }
            }
        });
        await redis.sRem(`post:comment:${id}:likes`, user.address);

        baseResponse<null>(response, {
            statusCode: 204,
            success: true,
            data: null
        })
    }
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
        isPrivate: true,
    }
));