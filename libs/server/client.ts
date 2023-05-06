import { PrismaClient } from "@prisma/client";

declare global {
    let client: PrismaClient | undefined;
}

const client: PrismaClient = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;