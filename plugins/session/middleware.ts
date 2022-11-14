import { MiddlewareHandlerContext } from '$fresh/server.ts';

import { startSession } from './mod.ts';

export async function sessionMiddlewareHandler(req: Request, ctx: MiddlewareHandlerContext) {
  startSession(req);
  return await ctx.next();
}