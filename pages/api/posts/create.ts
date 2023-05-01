import {NextApiRequest, NextApiResponse} from "next";
import {withApiSession} from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import ipfs from "@libs/server/ipfs";
import fs from "fs";
import parsedFormData from "@libs/server/parseFormData";
import client from "@libs/server/client";
import {FileType, StorageType} from "@prisma/client";


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

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<any>
) => {
    const formData = await parsedFormData<UploadForm>(request);
    const uploadedFile = fs.readFileSync(formData.files.file.filepath);

    // ipfs 에 이미지 파일 및 메타데이터 파일 업로드
    const ipfsFile = await ipfs.add(uploadedFile);
    const ipfsJson = await ipfs.add(JSON.stringify(formData.fields));

    // 업로드한 데이터 정보를 DB에 저장
    const savedFile = await client.storage.create({
       data: {
           name: formData.fields.name,
           hash: ipfsFile.path,
           fileType: "IMAGE",
           saveType: "IPFS",
           size: ipfsFile.size,
           url: `https://ipfs.io/ipfs/${ipfsFile.path}`,
       }
    });

    const savedJson = await client.storage.create({
        data: {
            name: formData.fields.name,
            hash: ipfsJson.path,
            fileType: "METADATA",
            saveType: "IPFS",
            size: ipfsJson.size,
            url: `https://ipfs.io/ipfs/${ipfsJson.path}`,
        }
    })

    console.log(savedFile);
    console.log(savedJson);

    response.json({})
}

export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
        isPrivate: false,
}));