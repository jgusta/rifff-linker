import { Plugin } from '$fresh/server.ts';

import {
  logout as _logout,
  readAuthCookies,
  setAuthCookies,
} from './auth.ts';
import { sessionMiddlewareHandler } from './middleware.ts';
import { getHeaders } from './responser.ts';
import { SessionState } from './sessionState.ts';
import {
  AuthBucket,
  AuthChildren,
  GlobalSession,
} from './types.ts';

function setAuth(auth: AuthBucket): void {
  SessionState.resetAuth();
  const headers = getHeaders();
  setAuthCookies(auth, headers);
  SessionState.hydrateAuth(auth);
}

// The only reason this is needed is because plugins don't seem 
// to have access to the Request object.
function startSession(req: Request): void {
  const auth = readAuthCookies(req.headers);
  SessionState.hydrateAuth(auth);
}

function isLoggedIn(): boolean {
  return SessionState.isLoggedIn();
}

function getSession(): GlobalSession {
  return SessionState.getGlobalSession();
}

function logout(): void {
  const headers = getHeaders();
  _logout(headers);
}

export type { AuthBucket, AuthChildren, GlobalSession, Plugin };

export { addHeader, getResponse, setBody } from './responser.ts';

export {
  getSession,
  isLoggedIn,
  logout,
  sessionMiddlewareHandler,
  setAuth,
  startSession,
};