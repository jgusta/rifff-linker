import type { AuthBucket, GlobalSession } from "@/plugins/session/types.ts";
import { nowTime } from "@/plugins/session/time.ts";
import { defaultSession, authKeys } from "@/plugins/session/util.ts";

export class SessionState {
  // static req?: Request;
  static auth?: AuthBucket;
  static valid = false;
  static hydrated = false;
  static res?: Response;

  static isLoggedIn = function (): boolean {
    SessionState.throwIfNotHydrated()
    return SessionState.valid
      && typeof SessionState.auth !== 'undefined'
      && SessionState.auth.expires > nowTime()
  }

  static globalSession: GlobalSession = defaultSession;

  static getGlobalSession = function (): GlobalSession {
    SessionState.throwIfNotHydrated();
    return SessionState.globalSession;
  }

  static getResponse = function () {
    if (typeof SessionState.res === 'undefined') {
      SessionState.res = new Response()
    }
    return SessionState.res;
  }

  static resetAuth = () => {
    SessionState.auth = undefined;
    SessionState.valid = false;
    SessionState.hydrated = false;
    SessionState.globalSession = defaultSession;
  }

  // Hydrated means startSession has been called
  static hydrateAuth = function (auth: Partial<AuthBucket>): void {
    if (!SessionState.isAuthValid(auth)) {
      SessionState.auth = undefined;
      SessionState.valid = false;
    }
    else {
      SessionState.auth = auth as AuthBucket;
      SessionState.valid = true;
    }
    SessionState.globalSession = {
      auth,
      isLoggedIn: SessionState.isLoggedIn,
      getName: function () { return this.auth?.user_id || '' }
    };
    SessionState.hydrated = true;
  }

  // AuthBucket typegaurd.
  // Does NOT mean logged in.
  static isAuthValid = function (auth: Partial<AuthBucket>): auth is AuthBucket {
    for (const el of authKeys)
      if (el in auth && auth[el] === null)
        return false;
    return true;
  }

  static throwIfNotHydrated = function (): void {
    if (!SessionState.hydrated) {
      throw new Error('Session not yet started');
    }
  }
}
