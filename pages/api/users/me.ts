import type { NextApiRequest, NextApiResponse } from 'next'
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";
import { User } from '@prisma/client';

interface UserWithFollow extends User {
    followings: number[];
    followers: number[];
}

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const { id, address } = request.session.user;
    const findUser = await client.user.findUnique({
      where: {
          address
      }
    });

    // await follow(5, findUser.id);

    baseResponse<UserWithFollow>(response, {
        success: true,
        data: findUser
    })
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
        isPrivate: true,
}));