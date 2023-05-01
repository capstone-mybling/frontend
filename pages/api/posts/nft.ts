// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import web3 from "@libs/server/mint";

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: 'John Doe' })
    web3;
}
