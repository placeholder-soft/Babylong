import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import svgr from "vite-plugin-svgr"
import CloudflarePagesFunctions from "vite-plugin-cloudflare-functions"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), nodePolyfills(), CloudflarePagesFunctions({
    root: "./functions",
            outDir: undefined,
            dts: "./cloudflare.d.ts",
            wrangler: {
              log: true,
              kv: ["artworks"],
            },
    } as PluginOption)
  ],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
    },
  },
})
