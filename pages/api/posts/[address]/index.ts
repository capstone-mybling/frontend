import type {NextApiRequest, NextApiResponse} from 'next'
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import baseResponse from "@libs/server/response";
import client from "@libs/server/client";


const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {id} = request.query;
    const {user} = request.session;

    if (user) {
        console.log(user);
    }

    const findPost = await client.post.findUnique({
        where: {
            id: +id,
        }
    });

    // 만약 id에 맞는 포스트가 없으면 에러
    if (!findPost) {
        baseResponse(response, {
            success: false,
            message: "not found post",
            error: "not found post"
        })
    }

    console.log(findPost);

    baseResponse<any>(response, {
        success: true,
        data: findPost
    })
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
        isPrivate: false,
    }));