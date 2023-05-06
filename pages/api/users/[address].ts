import type {NextApiRequest, NextApiResponse} from 'next'
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import {User} from '@prisma/client';
import ErrorCode from "@libs/server/error_code";
import getRedisClient from "@libs/server/redis";

interface UserWithFollow extends User {
    followings: number[];
    followers: number[];
}

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {address} = request.query;

    if (!address) {
        baseResponse(response, {
            success: false,
            error: {
                message: "not found address",
                errorMessage: "주소가 존재하지 않습니다. 다시 입력해주세요.",
                errorCode: ErrorCode.ADDRESS_IS_REQUIRED,
            }
        })
    }

    const findUser = await client.user.findUnique({
        where: {
            address: address as string,
        }
    });

    const redis = await getRedisClient();
    const userFollowers = await redis.sMembers(`user:${address}:followers`);
    const userFollowings = await redis.sMembers(`user:${address}:followings`);

    baseResponse<UserWithFollow>(response, {
        success: true,
        data: {
            ...findUser,
            followers: userFollowers,
            followings: userFollowings,
        }
    })
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
        isPrivate: false,
    }));