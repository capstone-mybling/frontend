import type {NextApiRequest, NextApiResponse} from 'next'
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";

/**
 * @description 댓글 조회 및 생성
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
    }

    if (request.method === "GET") {
        const redis = await getRedisClient();

        const likes = await redis.sMembers(`post:${address}:likes`);

        if (user) {
            const existLike: boolean = likes.some((like) => like === user.address);
            return baseResponse<any>(response, {
                success: true,
                data: {
                    likes: likes.length,
                    isLike: existLike,
                    ...findPost
                }
            })
        } else {
            return baseResponse<any>(response, {
                success: true,
                data: findPost
            })
        }

    } else if (request.method === "POST") {
        const {content} = request.body;

        if (!content) {
            return baseResponse(response, {
                statusCode: 400,
                success: false,
                error: {
                    errorMessage: "댓글 내용을 입력해주세요.",
                    errorCode: ErrorCode.CONTENT_DOES_NOT_EXIST,
                }
            })
        }

        const newPostComment = await client.postComment.create({
            data: {
                content,
                authorId: user.id,
                postAddress: address as string,
            }
        });

        return baseResponse(response, {
            statusCode: 201,
            success: true,
            data: newPostComment,
        });
    }
}

export default withApiSession(
    withHandler({
        methods: ["GET", "POST"],
        handler,
        isPrivate: false,
    }));