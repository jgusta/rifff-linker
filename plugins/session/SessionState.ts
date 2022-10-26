
import { AuthBucket, GlobalSession, Maybe } from "@/plugins/session/types.ts";
import { readAuthCookies, isAuthValid } from "./auth.ts";
import nowTime from "./time.ts";

class SessionState {
  static req?: Request;
  static auth: Maybe<AuthBucket>;
  static reqHeaders?: Headers;
  static valid = false;
  static hydrated = false;
  static globalSession?: GlobalSession

  // Hydrated means startSession has been called
  static hydrateAuth = function (req: Request): void {
    const reqHeaders: Headers = req.headers;
    SessionState.req = req;
    SessionState.reqHeaders = reqHeaders;
    const auth = readAuthCookies(reqHeaders);
    if (isAuthValid(auth)) {
      SessionState.auth = auth;
      SessionState.valid = true;
    }
    else {
      SessionState.auth = null;
      SessionState.valid = false;
    }
    SessionState.hydrated = true;
  };

  static throwIfNotHydrated = function (): void {
    if (!SessionState.hydrated) {
      throw new Error('Session not yet started');
    }
  }

  static getGlobalSession = function () {
    SessionState.throwIfNotHydrated()
    return SessionState.globalSession || (() => {
      SessionState.globalSession = {
        auth: SessionState.auth,
        isLoggedIn,
        getName: function () { return this.auth?.user_id || '' }
      };
      return SessionState.globalSession;
    })();
  }
}

export function startSession(req: Request): void {
  SessionState.hydrateAuth(req);
}

export function getSession() {
  return SessionState.getGlobalSession();
}

export function isLoggedIn() {
  const now = nowTime();
  const auth = SessionState.auth;
  return SessionState.hydrated && SessionState.valid && auth && auth.expires > now
}
