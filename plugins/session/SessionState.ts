import {
  setCookie,
  getCookies,
  deleteCookie
} from "$std/http/cookie.ts"
import { AuthBucket, Maybe } from "@session";

const keys: (keyof AuthBucket)[] = ['token', 'password', 'user_id', 'expires'];

const setAuth = function setAuth(data: AuthBucket, headers: Headers) {
  setCookie(headers, { name: "t", value: data.token });
  setCookie(headers, { name: "p", value: data.password });
  setCookie(headers, { name: "i", value: data.user_id });
  setCookie(headers, { name: "e", value: String(data.expires) });
}

const killCookies = function killCookies(headers: Headers) {
    for (const el of keys) {
      deleteCookie(headers,el)
    }
}

// Return true if auth is a valid AuthBucket type.
// Does NOT mean logged in.
function isAuthValid(auth: Partial<AuthBucket>): auth is AuthBucket {
  for (const el of keys) {
    if (el in auth && auth[el] === null) {
      return false;
    }
  }
  return true;
}

// Retrieve what is possibly a valid auth from cookies
function readAuth(headers: Headers): Partial<AuthBucket> {
  const cookies = getCookies(headers)
  const out: Partial<AuthBucket> = {
    token: cookies.token || undefined,
    password: cookies.password || undefined,
    user_id: cookies.user_id || undefined,
    expires: cookies.expires ? Number(cookies.expires) : undefined,
  }
  return out;
}

function throwIfNotHydrated(): void {
  if (!SessionState.hydrated) {
    throw new Error('Session not yet started');
  }
}

class SessionState {
  static request?: Request;
  static auth: Maybe<AuthBucket>;
  static headers?: Headers;
  static valid = false;
  static hydrated = false;

  // Hydrated here means that we have an instance of the request object
  // which we have to get from a custom handler by having
  // it call 
  static hydrateAuth = function (request: Request): void {
    const headers: Headers = request.headers;
    SessionState.request = request;
    SessionState.headers = headers;
    const auth = readAuth(headers);
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

}

const startSession = function startSession(req: Request): Promise<void> {
  return new Promise<void>((done)=> {
    SessionState.hydrateAuth(req);
    done();
  })
}

const isStarted = function isStarted() {
  return SessionState.hydrated;
}

const getAuth = function getAuth(): Maybe<AuthBucket> {
  throwIfNotHydrated()
  return SessionState.auth;
}

const isLoggedIn = function isLoggedIn() {
  throwIfNotHydrated()
  if (!SessionState.valid) {
    return false;
  }
  const auth = (SessionState.auth as AuthBucket);
  const now = (new Date()).getTime()
  if (auth && auth.expires > now) {
    return true;
  }
}

export {
  setAuth,
  SessionState,
  startSession,
  isStarted,
  getAuth,
  isLoggedIn,
  killCookies
}