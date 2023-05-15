# Deno Session Plugin

A session plugin for [Fresh](https://github.com/denoland/fresh)
Session plugin for Deno.

# Usage


```json
{
  "imports": {
    "@session": "./plugins/session/mod.ts"
  }
}
```

```js
import { sessionMiddlewareHandler } from '@session';
export const handler = [logHandler, sessionMiddlewareHandler];
```