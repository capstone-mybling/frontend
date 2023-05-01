import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {

    response.json({})
}

export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
        isPrivate: false,}
    )
);