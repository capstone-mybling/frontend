import type {NextApiRequest, NextApiResponse} from 'next'
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import {User} from '@prisma/client';
import getRedisClient from "@libs/server/redis";

interface UserWithFollow extends User {
    followings: number[];
    followers: number[];
}

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {id, address} = request.session.user;

    const findUser = await client.user.findUnique({
        where: {
            address
        },
        include: {
            posts: true,
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
        isPrivate: true,
    }));