import { setAuthCookies,readAuthCookies } from '@/plugins/session/auth.ts';
import { AuthBucket } from '@session';
import { Plugin } from "$fresh/server.ts";
import { SessionState } from "@/plugins/session/sessionState.ts";

export * from "@/plugins/session/types.ts";
import  {
  setBody,
  addHeader,
  getHeaders,
  getResponse,
} from '@/plugins/session/responser.ts';

export {
  getResponse,
  setBody,
  addHeader
}

export function setAuth(auth:AuthBucket) {
  
  SessionState.resetAuth();
  const headers = getHeaders();
  setAuthCookies(auth, headers);
  SessionState.hydrateAuth(auth);
}

export function startSession(req: Request): void {
  const auth = readAuthCookies(req.headers);
  SessionState.hydrateAuth(auth);
}

export function isLoggedIn() {
  return SessionState.isLoggedIn();
}

export function getSession() {
  return SessionState.globalSession
}

export default function session(): Plugin {
  return {
    name: "session",
    render: (ctx) => {
      ctx.render();
      return {};
    }
  }
}



