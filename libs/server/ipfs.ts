import { create } from "ipfs-http-client";

const ipfs = create({
    protocol: process.env.NODE_ENV === "production" ? "https" : "http",
    host: "127.0.0.1",
    port: 5001,
})

export default ipfs;