import {
    makePagesFunction,
    makeResponse,
  } from "vite-plugin-cloudflare-functions/worker"
  import { PagesFunctionEnv } from "../../types"

export const onRequestGet = makePagesFunction<unknown, PagesFunctionEnv>(
    async ({ params, env }) => {
      const keys = (await env.satlayer_hackathon_tokens.list()).keys.map(key => key.name);

      const tokens = await Promise.all(keys.map(key => env.satlayer_hackathon_tokens.get(key)));

      return makeResponse(tokens, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Max-Age": "86400",
        },
      })
    },
  )