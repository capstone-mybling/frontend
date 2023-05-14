import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";


const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {address} = request.query;
    const {user} = request.session;
    const redis = await getRedisClient();

    if (!address) {
        return baseResponse(response, {
            statusCode: 400,
            success: false,
            error: {
                errorMessage: "address가 필요합니다.",
                errorCode: ErrorCode.ADDRESS_IS_REQUIRED
            }
        });
    }

    const existLike: boolean = await client.postLike.count({
        where: {
            userId: user!.id,
            postAddress: address as string,
        }
    }).then(count => count > 0);

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
        await client.postLike.create({
            data: {
                userId: user!.id,
                postAddress: address as string
            }
        });
        await redis.sAdd(`posts:${address}:likes`, user!.address);

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
        await client.postLike.delete({
            where: {
                postAddress_userId: {
                    userId: user!.id,
                    postAddress: address as string,
                }
            }
        });
        await redis.sRem(`posts:${address}:likes`, user!.address);

        baseResponse<null>(response, {
            statusCode: 204,
            success: true,
            data: null
        })
    }
}

export default withApiSession(
    withHandler({
        methods: ["POST", "DELETE"],
        handler,
        isPrivate: true,
    })
);
