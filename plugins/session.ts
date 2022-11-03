import { setAuthCookies,readAuthCookies } from '@/plugins/session/auth.ts';
import { AuthBucket } from '@session';
import { Plugin } from "$fresh/server.ts";
import { SessionState } from "@/plugins/session/sessionState.ts";

export * from "@/plugins/session/types.ts";

export function setAuth(headers:Headers, auth:AuthBucket) {
  headers = SessionState.getResponse().headers
  SessionState.resetAuth();
  setAuthCookies(auth, headers);
  SessionState.hydrateAuth(auth);
}

export function startSession(req: Request): void {
  const auth = readAuthCookies(req.headers);
  SessionState.hydrateAuth(auth);
}

export function getSession() {
  
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



