// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import client from "@/libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from '@/libs/server/withSession';

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const { address } = request.body;

    // address 가 없으면 에러
    if (!address) {
        response.json({
            success: false,
            message: "address is required",
        });
        return;
    }

    // 이미 로그인 되어있으면 에러
    if (request.session.user) {
        response.json({
            success: false,
            message: "already logged in",
        });
        return;
    }


    const findUser = await client.user.upsert({
        where: {
            address: address
        },
        update: {},
        create: {
            address: address,
        },
    });

    // 찾은 유저의 정보를 세션에 저장
    request.session.user = {
        id: findUser.id,
        address: findUser.address,
    };

    await request.session.save();

    response.json({
        success: true,
    })
}

export default withApiSession(
    withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
}));