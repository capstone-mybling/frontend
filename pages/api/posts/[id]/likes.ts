import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import baseResponse from "@libs/server/response";


const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {id} = request.query;
    const {user} = request.session;

    const existLike = await client.postLike.count({
        where: {
            postId: +id,
            userId: user.id
        }
    }).then(count => count > 0);

    if (request.method === "POST") {
        if (existLike) {
            baseResponse(response, {
                success: false,
                message: "좋아요가 이미 존재합니다. 다시 확인해주세요.",
                error: "already liked"
            })
        }

        // 실제 좋아요 생성 처리 로직
        await client.postLike.create({
            data: {
                postId: +id,
                userId: user.id
            }
        })

        baseResponse(response, {
            success: true,
            message: "success",
            data: null
        })
    } else if (request.method === "DELETE") {
        if (!existLike) {
            baseResponse(response, {
                success: false,
                message: "좋아요가 존재하지 않습니다. 다시 확인해주세요.",
                error: "not found like"
            })
        }

        // 실제 좋아요 삭제 처리 로직
        await client.postLike.delete({
            where: {
                postId_userId: {
                    postId: +id,
                    userId: user.id
                }
            }
        });

        baseResponse(response, {
            success: true,
            message: "success",
            data: null
        })
    }
}

export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
        isPrivate: false,
    })
);
