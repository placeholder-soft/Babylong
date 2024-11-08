import { onRequestGet as __api_create_ts_onRequestGet } from "/Users/chuan_yu/Desktop/work/satlayer-hackathon/functions/api/create.ts"

export const routes = [
    {
      routePath: "/api/create",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_create_ts_onRequestGet],
    },
  ]