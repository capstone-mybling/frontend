import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";


const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {id} = request.query;
    const {user} = request.session;

    const existLike: boolean = await client.postLike.count({
        where: {
            postId: +id,
            userId: user.id
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
                postId: +id,
                userId: user.id
            }
        });

        baseResponse(response, {
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
                postId_userId: {
                    postId: +id,
                    userId: user.id
                }
            }
        });

        baseResponse(response, {
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
