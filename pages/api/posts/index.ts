import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { FileType } from "@libs/client/types";
import baseResponse from "@libs/server/response";
import getRedisClient from "@libs/server/redis";

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
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { user } = request.session;

  if (request.method === "GET") {
    const redis = await getRedisClient();

    const followings = await redis.sMembers(`user:${user!.address}:followings`);

    const findPosts = await client.post.findMany({
      where: {
        OR: {
          author: {
            is: {
              address: {
                in: [...followings, user!.address],
              },
            },
          },
        },
      },
      include: {
        author: true,
        comments: true,
        transfers: true,
      },
    });

    const posts = await Promise.all(
      findPosts.map(async (post) => {
        const owner = await client.user.findUnique({
          where: {
            address: post.currentOwnerAddress ?? "",
          },
        });

        return {
          ...post,
          likes: await redis.sCard(`posts:${post.address}:likes`),
          isLiked:
            !user ||
            (await redis.sIsMember(
              `posts:${post.address}:likes`,
              user!.address
            )),
          currentOwner: owner && {
            address: owner.address,
            username: owner.username,
            avatar: owner.avatar,
          },
        };
      })
    );

    return baseResponse(response, {
      success: true,
      data: posts,
    });
  } else if (request.method === "POST") {
    const {
      from,
      to,
      hash,
      ipfsHash,
      imageHash,
      name,
      description,
      count,
      price,
      mintId,
      itemId,
    } = request.body;

    const contract = await client.contract.create({
      data: {
        fromAddress: from,
        toAddress: to,
        hash,
        authorAddress: user!.address,
        itemId,
        mintId,
      },
    });

    // TODO: 스토리지에 저장된 컨트랙트 업데이트 코드 필요 시 사용 예정
    await client.storage.update({
      where: {
        hash: imageHash,
      },
      data: {
        contractAddress: contract.hash,
      },
    });
    await client.storage.update({
      where: {
        hash: ipfsHash,
      },
      data: {
        contractAddress: contract.hash,
      },
    });

    const post = await client.post.create({
      data: {
        name,
        description,
        authorAddress: user!.address,
        contractAddress: contract.hash,
        address: ipfsHash,
        thumbnail: "https://gateway.pinata.cloud/ipfs/" + imageHash,
        price: +price,
        count: +count,
        currentOwnerAddress: user!.address,
      },
    });

    await client.transfer.create({
      data: {
        fromAddress: "0x0000000000000000000000000000000000000000",
        toAddress: user!.address,
        contractAddress: hash,
        method: "mint",
        postAddress: post.address,
      },
    });

    return baseResponse(response, {
      success: true,
      data: post,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
