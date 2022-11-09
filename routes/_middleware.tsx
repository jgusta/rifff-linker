import { blue, cyan, green, magenta, red, yellow } from "$std/fmt/colors.ts";
import { startSession } from "@session";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function logHandler(req: Request, ctx: MiddlewareHandlerContext) {
  // For Logging
  const dontLog = [
    "/_frsh",
    "/favicon.ico",
    '/fonts'
  ];
  const start = Date.now();
  const { pathname } = new URL(req.url);
  const resp: Response = await ctx.next();
  const now = Date.now();
  const ms = now - start;
  const status = () => {
    const str = resp.status.toString();
    if (str[0] === "2") {
      return green(str);
    }
    if (str[0] === "3") {
      return yellow(str);
    } else {
      return red(str);
    }
  };
  let skip = false;
  for (const i of dontLog) {
    if ((pathname.startsWith('/') && pathname.startsWith(i)) || pathname.endsWith(i)) {
      skip = true
      break;
    }
  }
  if (!skip) {
    console.log(
      `[${magenta(new Date(now).toISOString())}] ${blue(req.method)} ${
        cyan(pathname)
      } - ${blue(String(ms) + "ms")} - ${status()}`,
    );
  }
  return resp;
}

export async function sessionHandler(req: Request, ctx: MiddlewareHandlerContext) {
  startSession(req);
  return await ctx.next();
}

export const handler = [logHandler,sessionHandler];