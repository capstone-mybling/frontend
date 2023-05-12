import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import parsedFormData from "@libs/server/parseFormData";
import fs from "fs";
import {FileType} from "@prisma/client";
import ipfs from "@libs/server/ipfs";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";

interface UploadForm {
    name: string;
    externalUrl: string;
    description: string;
    file: any;
    fileType: FileType;
    properties: {
        [key: string]: string;
    }
    count: number;
    price: number;
}

/**
 * 게시글 목록 조회 및 생성
 * @param request
 * @param response
 */
const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const {user} = request.session;

    if (request.method === "GET") {
        // const findPosts = await client.post.findMany();
        //
        // return baseResponse(response, {
        //     success: true,
        //     data: findPosts,
        // });
    } else if (request.method === "POST") {
        console.log(request);
        const { from, to, hash, ipfsHash } = request.body;
        const contract = await client.contract.create({
            data: {
                fromAddress: from,
                toAddress: to,
                hash,
                authorAddress: user!.address
            }
        });

        const post = await client.post.create({
            data: {
                authorAddress: user!.address,
                contractAddress: contract.hash,
                address: ipfsHash,
            }
        });

        return baseResponse(response, {
            success: true,
            data: post,
        });
    }

}

export default withApiSession(
    withHandler({
            methods: ["GET", "POST"],
            handler,
            isPrivate: false,
        }
    )
);