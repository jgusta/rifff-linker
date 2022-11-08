import { setAuthCookies, readAuthCookies } from '@/plugins/session/auth.ts';
import { AuthBucket } from '@session';
import { Plugin } from "$fresh/server.ts";
import { SessionState } from "@/plugins/session/sessionState.ts";
import { logout as _logout } from "@/plugins/session/auth.ts";
import { getHeaders } from '@/plugins/session/responser.ts';

export * from "@/plugins/session/types.ts";

export {
  getResponse,
  setBody,
  addHeader
} from "@/plugins/session/responser.ts";

export function setAuth(auth: AuthBucket) {
  SessionState.resetAuth();
  const headers = getHeaders();
  setAuthCookies(auth, headers);
  SessionState.hydrateAuth(auth);
}

// The only reason this is needed is because plugins don't seem 
// to have access to the Request object.
export function startSession(req: Request) {
  const auth = readAuthCookies(req.headers);
  SessionState.hydrateAuth(auth);
}

export function isLoggedIn() {
  return SessionState.isLoggedIn();
}

export function getSession() {
  return SessionState.getGlobalSession();
}

export function logout() {
  const headers = getHeaders();
  _logout(headers);
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



