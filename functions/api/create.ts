import { makePagesFunction } from "vite-plugin-cloudflare-functions/worker"

export const onRequestGet = makePagesFunction(
    async ({ params, env }) => {
        return ({
            message: "Hello, World!"
        })
    },
)