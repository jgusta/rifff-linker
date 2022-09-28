import { blue, cyan, green, magenta, red, yellow } from "$std/fmt/colors.ts";

export interface MiddlewareContext {
  next: () => Promise<Response>;
}
export async function handler(req: Request, ctx: MiddlewareContext) {
  // For Logging
  const dontLog = [
    "/_frsh/alive",
    "/_frsh/refresh.js",
    "/favicon.ico",
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
  resp.headers.set("X-Response-Time", `${ms}ms`);
  if (!dontLog.includes(pathname)) {
    console.log(
      `[${magenta(new Date(now).toISOString())}] ${blue(req.method)} ${
        cyan(pathname)
      } - ${blue(String(ms) + "ms")} - ${status()}`,
    );
  }
  return resp;
}
