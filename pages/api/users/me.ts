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
    // TODO: 해결 방법 찾아보기
    if (!request.session.user) {
        return;
    }
    const {address} = request.session.user;

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

    // followings, followers 에 아바타와 유저네임 정보를 추가해주는 작업
    const userFollowerWithInfo = await Promise.all(
        userFollowers.map(async (userAddress) => {
            const user = await client.user.findUnique({
                where: {
                    address: userAddress
                }
            });
            if (!user) return;
            return {
                address: userAddress,
                avatar: user.avatar,
                username: user.username
            }
        })
    );
    const userFollowingWithInfo = await Promise.all(
        userFollowings.map(async (userAddress) => {
            const user = await client.user.findUnique({
                where: {
                    address: userAddress
                }
            });
            if (!user) return;
            return {
                address: userAddress,
                avatar: user.avatar,
                username: user.username
            }
        })
    )

    baseResponse(response, {
        success: true,
        data: {
            ...findUser,
            followers: userFollowerWithInfo,
            followings: userFollowingWithInfo,
        }
    })
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
        isPrivate: true,
    }));