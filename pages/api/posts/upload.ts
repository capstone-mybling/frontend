import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import parsedFormData from "@libs/server/parseFormData";
import fs from "fs";
import { FileType } from "@libs/client/types";
import { uploadFileToIPFS, uploadJsonToIPFS } from "@libs/server/ipfs";
import baseResponse from "@libs/server/response";
import ErrorCode from "@libs/server/error_code";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadForm {
  name: string;
  externalUrl: string;
  description: string;
  file: any;
  fileType: FileType;
  properties: {
    [key: string]: string;
  };
  count: number;
  price: number;
}

/**
 * 게시글 목록 조회 및 생성
 * @param request
 * @param response
 */
const handler = async (request: NextApiRequest, response: NextApiResponse<any>) => {
  const { user } = request.session;

  if (!user) {
    return baseResponse(response, {
      statusCode: 401,
      success: false,
      error: {
        errorMessage: "로그인이 필요합니다.",
        errorCode: ErrorCode.UNAUTHORIZED,
      },
    });
  }

  const formData = await parsedFormData(request);
  const uploadedFile = fs.createReadStream(formData.files.image.filepath);
  console.log(uploadedFile);

  if (!uploadedFile || !formData.fields.name) {
    return baseResponse(response, {
      success: false,
      error: {
        errorMessage: "파일 또는 이름이 존재하지 않습니다.",
        errorCode: ErrorCode.FILE_IS_REQUIRED,
      },
    });
  }

  // ipfs 에 이미지 파일 및 메타데이터 파일 업로드
  const ipfsFile = await uploadFileToIPFS(uploadedFile, formData.fields.name);
  const ipfsJson = await uploadJsonToIPFS(
    {
      image_url: `https://gateway.pinata.cloud/ipfs/${ipfsFile.ipfsHash}`,
      image: `ipfs://${ipfsFile.ipfsHash}`,
      description: formData.fields.description,
      name: formData.fields.name,
      type: "object",
      attributes: {
        name: {
          type: "string",
          description: formData.fields.name,
        },
        description: {
          type: "string",
          description: formData.fields.description,
        },
        image: {
          type: "string",
          description: `ipfs://${ipfsFile.ipfsHash}`,
        },
      },
    },
    formData.fields.name
  );

  // 업로드한 데이터 정보를 DB에 저장
  await client.storage.create({
    data: {
      name: formData.fields.name,
      hash: ipfsFile.ipfsHash,
      fileType: "IMAGE",
      saveType: "IPFS",
      size: ipfsFile.pinSize,
      url: `https://ipfs.io/ipfs/${ipfsFile.ipfsHash}`,
    },
  });
  await client.storage.create({
    data: {
      name: formData.fields.name,
      hash: ipfsJson.ipfsHash,
      fileType: "METADATA",
      saveType: "IPFS",
      size: ipfsJson.pinSize,
      url: `https://ipfs.io/ipfs/${ipfsJson.ipfsHash}`,
    },
  });

  return baseResponse(response, {
    success: true,
    data: {
      imageHash: ipfsFile.ipfsHash,
      ipfsHash: ipfsJson.ipfsHash,
    },
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
