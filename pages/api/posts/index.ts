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

export const config = {
    api: {
        bodyParser: false
    }
}

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
        const findPosts = await client.post.findMany();

        return baseResponse(response, {
            success: true,
            data: findPosts,
        });
    } else if (request.method === "POST") {
        if (!user) {
            return baseResponse(response, {
                statusCode: 401,
                success: false,
                error: {
                    errorMessage: "로그인이 필요합니다.",
                    errorCode: ErrorCode.UNAUTHORIZED,
                }
            });
        }

        const formData = await parsedFormData<UploadForm>(request);
        const uploadedFile = fs.readFileSync(formData.files.file.filepath);

        if (!uploadedFile || !formData.fields.name) {
            return baseResponse(response, {
                success: false,
                error: {
                    errorMessage: "파일 또는 이름이 존재하지 않습니다.",
                    errorCode: ErrorCode.FILE_IS_REQUIRED,
                }
            });
        }

        // ipfs 에 이미지 파일 및 메타데이터 파일 업로드
        const ipfsFile = await ipfs.add(uploadedFile);
        const ipfsJson = await ipfs.add(JSON.stringify(formData.fields));

        // 업로드한 데이터 정보를 DB에 저장
        await client.storage.create({
            data: {
                name: formData.fields.name,
                hash: ipfsFile.path,
                fileType: "IMAGE",
                saveType: "IPFS",
                size: ipfsFile.size,
                url: `https://ipfs.io/ipfs/${ipfsFile.path}`,
            }
        });
        await client.storage.create({
            data: {
                name: formData.fields.name,
                hash: ipfsJson.path,
                fileType: "METADATA",
                saveType: "IPFS",
                size: ipfsJson.size,
                url: `https://ipfs.io/ipfs/${ipfsJson.path}`,
            }
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