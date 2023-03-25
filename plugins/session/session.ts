import { setAuth } from '@session';
import { AnyAuthBucket, AuthBucket } from "./types.ts"
import {
  authKeys
} from './util.ts';

export function nowTime() {
  return (new Date()).getTime();
}

type SessionState =
  // session just started, not yet read or checked cookies
  "initial"

  // session info read and validated, but not checked against server yet
  | "valid"

  // session info not valid or user is logged out
  | "unauthenticated"

  // session info is confirmed by server and cookies are updated
  | "authenticated"

  // cookies exist, are valid, but expired
  | "expired";

export class Session {
  auth: AnyAuthBucket
  state: SessionState

  constructor() {
    this.auth = {
      expires: 0
    }
    this.state = "initial"
  }

  getName(): string {
    return this.auth?.user_id || ''
  }

  isLoggedIn(): boolean {
    if (this.state === 'authenticated' && this.auth.expires < nowTime()) {
      this.resetAuth()
      this.state = "expired"
      return false;
    }

    return this.isAuthValid(this.auth)
      && this.auth.expires > nowTime()
  }

  resetAuth() {
    this.auth = { expires: 0 }
    this.state = "initial";
  }

  setAuth(auth: AnyAuthBucket) {
    if (!this.isAuthValid(auth)) {
      this.resetAuth();
      this.state = "unauthenticated";
    }
    else {
      this.auth = auth;
      this.state = "valid";
    }
  }

  // AuthBucket typegaurd.
  // Does NOT mean logged in.
  isAuthValid(auth: AnyAuthBucket): auth is AuthBucket {
    if (typeof auth === 'undefined' || null === auth) {
      return false;
    }
    for (const el in auth)
      if (el in authKeys && auth[el as keyof AuthBucket] !== 'undefined')
        return false;
    return true;
  }
  
}