import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import getRedisClient from "@libs/server/redis";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {user} = request.session;
    const redis = await getRedisClient();
    const {address} = request.query;

    // 주소 입력하지 않은 경우 에러 발생
    if (!address) {
        return baseResponse(response, {
            statusCode: 400,
            success: false,
            error: {
                message: "address is required",
                errorMessage: "주소를 입력해주세요.",
                errorCode: ErrorCode.ADDRESS_IS_REQUIRED
            }
        })
    }

    // 자기 자신을 팔로잉 할 경우
    if (user.address === address) {
        return baseResponse(response, {
            statusCode: 400,
            success: false,
            error: {
                message: "cannot follow yourself",
                errorMessage: "자기 자신을 팔로우 할 수 없습니다.",
                errorCode: ErrorCode.CANNOT_FOLLOW_YOURSELF
            }
        })
    }

    if (request.method === "POST") {
        // 이미 팔로잉 중인 유저인 경우
        if (await redis.sIsMember(`user:${user.address}:followings`, String(address))) {
            return baseResponse(response, {
                statusCode: 400,
                success: false,
                error: {
                    message: "already following",
                    errorMessage: "이미 팔로잉 중인 유저입니다.",
                    errorCode: ErrorCode.RELATIONSHIP_ALREADY_EXISTS
                }
            })
        }

        await redis.sAdd(`user:${user.address}:followings`, String(address));
        await redis.sAdd(`user:${address}:followers`, String(user.address));

        return baseResponse(response, {
            statusCode: 201,
            success: true,
            data: null
        });
    } else if (request.method === "DELETE") {
        // 팔로잉 하지 않은 유저를 팔로우할 경우
        if (!await redis.sIsMember(`user:${user.address}:followings`, String(address))) {
            return baseResponse(response, {
                statusCode: 400,
                success: false,
                error: {
                    message: "not following",
                    errorMessage: "팔로잉 하지 않은 유저를 언팔로우 할 수 없습니다.",
                    errorCode: ErrorCode.RELATIONSHIP_NOT_FOUND
                }
            })
        }
        await redis.sRem(`user:${user.address}:followings`, String(address));
        await redis.sRem(`user:${address}:followers`, String(user.address));

        return baseResponse(response, {
            statusCode: 204,
            success: true,
            data: null
        });
    }
}

export default withApiSession(
    withHandler({
            methods: ["POST", "DELETE"],
            handler,
            isPrivate: true,
        }
    )
);