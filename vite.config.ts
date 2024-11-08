import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import CloudflarePagesFunctions from "vite-plugin-cloudflare-functions"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    nodePolyfills(),
    CloudflarePagesFunctions({
      root: "./functions",
      outDir: undefined,
      dts: "./cloudflare.d.ts",
      wrangler: {
        log: true,
        kv: ["satlayer_hackathon_tokens"],
      },
    }),
  ],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
    },
  },
})
