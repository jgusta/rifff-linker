import { assert, Plugin } from "./deps.ts";
import { logout as _logout } from "./auth.ts";
import { createSessionMiddlewareHandler } from "./middleware.ts";
import type { Cookies } from "./types.ts";
export type {Cookies};

let cookieShape: Cookies;

export default function sessionPlugin(cookies: Cookies, logger = null): Plugin {
  assert(
    cookieShape.expires === 0,
    "Session cookie shape must have an expires property",
  );
  cookieShape = cookies;
  return {
    name: "session",
    render: (ctx) => {
      ctx.render();
      return {};
    },
  };
}

export {cookieShape, createSessionMiddlewareHandler };