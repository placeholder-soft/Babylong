import type { CloudflareResponseBody } from 'vite-plugin-cloudflare-functions/worker';

import 'vite-plugin-cloudflare-functions/client';

declare module 'vite-plugin-cloudflare-functions/client' {
  interface PagesResponseBody {
    '/api/token-list': {
      GET: CloudflareResponseBody<typeof import('functions/api/token-list')['onRequestGet']>;
    };
    '/api/tokens/:tokenId': {
      GET: CloudflareResponseBody<typeof import('functions/api/tokens/[tokenId]')['onRequestGet']>;
      POST: CloudflareResponseBody<typeof import('functions/api/tokens/[tokenId]')['onRequestPost']>;
    };
  }
}
