import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Session } from "./session.ts";
import { SessionExtension } from "./types.ts";

export function createSessionMiddlewareHandler(ext: SessionExtension) {
  const sessionMiddlewareHandler = async function (req: Request, ctx: MiddlewareHandlerContext) {
      const session = await Session.create(req, ext);
      ctx.state.session = session;
      const res = await ctx.next();
      return res;
  };
  return sessionMiddlewareHandler;
}