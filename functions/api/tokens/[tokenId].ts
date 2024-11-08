import {
    makePagesFunction,
    makeRawPagesFunction,
    makeResponse,
  } from "vite-plugin-cloudflare-functions/worker"
  import { PagesFunctionEnv } from "../../types"
  
  export const onRequestGet = makePagesFunction<unknown, PagesFunctionEnv>(
    async ({ params, env }) => {
      const { tokenId } = params
      const token = await env.satlayer_hackathon_tokens.get(tokenId as string)
      if (token === null) {
        return makeResponse(null, {
          status: 404,
        })
      }
      return makeResponse(JSON.parse(token), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Max-Age": "86400",
        },
      })
    },
  )
  
  export const onRequestPost = makeRawPagesFunction<unknown, PagesFunctionEnv>(
    async info => {
      const { params, env, request } = info
      const { tokenId } = params
  
      const obj = await request.clone().json()
  
      const token = JSON.stringify(obj)
      await env.satlayer_hackathon_tokens.put(tokenId as string, token)
  
      // cors
      return makeResponse(JSON.parse(token), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Max-Age": "86400",
        },
      })
    },
  )
  