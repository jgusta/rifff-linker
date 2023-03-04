import { Plugin } from '$fresh/server.ts';

export type {
  AuthBucket,
  AuthChildren,
} from './session/types.ts';

export {
  addHeader,
  getResponse,
  getSession,
  isLoggedIn,
  logout,
  sessionMiddlewareHandler,
  setAuth,
  setBody,
  startSession,
} from './session/mod.ts';

export default function session(): Plugin {
  return {
    name: "session",
    render: (ctx) => {
      ctx.render();
      return {};
    }
  }
}



