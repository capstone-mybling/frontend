import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "PATCH" | "POST" | "DELETE";

interface ConfigType {
    methods: method[];
    handler: (req: NextApiRequest, res: NextApiResponse) => void;
    isPrivate?: boolean;
}

export default function withHandler({
    methods,
    isPrivate = true,
    handler,
    }: ConfigType) {
    return async function (
        request: NextApiRequest,
        response: NextApiResponse
    ): Promise<any> {
        if (request.method && !methods.includes(request.method as any)) {
            return response.status(405).end();
        }
        if (isPrivate && !request.session.user) {
            return response.status(401).json({ ok: false, error: "Plz log in." });
        }
        try {
            await handler(request, response);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error });
        }
    };
}