import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import getRedisClient from "@libs/server/redis";
import baseResponse from "@libs/server/response";

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {user} = request.session;
    const redis = await getRedisClient();

    const followings = await redis.sMembers(`user:${user!.address}:followings`);
    const followers = await redis.sMembers(`user:${user!.address}:followers`);

    // TODO: followings, followers를 UserWithFollow 타입으로 변환

    return baseResponse(response, {
        success: true,
        data: {
            followings,
            followers,
        }
    })
}

export default withApiSession(
    withHandler({
            methods: ["GET"],
            handler,
            isPrivate: true,
        }
    )
);