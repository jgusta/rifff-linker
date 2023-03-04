import { MiddlewareHandlerContext } from '$fresh/server.ts';

import { startSession } from './mod.ts';

export async function sessionMiddlewareHandler(req: Request, ctx: MiddlewareHandlerContext) {
  const session = startSession(req);
  ctx.state.session = session;
  const res = await ctx.next();

  return res;
}