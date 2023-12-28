import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Session } from "./mod.ts";
import { SessionExtension } from "./session.ts";

export function createSessionMiddlewareHandler(
  ext: SessionExtension,
): (req: Request, ctx: MiddlewareHandlerContext) => Promise<Response> {
  const sessionMiddlewareHandler = async function (
    req: Request,
    ctx: MiddlewareHandlerContext
  ) {
    const session = await Session.create(req, ext);
    ctx.state.session = session;
    const res = await ctx.next();
    return res;
  };
  return sessionMiddlewareHandler;
}
