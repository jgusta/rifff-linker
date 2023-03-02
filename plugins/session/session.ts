import { AuthBucket, Maybe } from "./types.ts"
import {
  authKeys,
  nowTime,
} from './util.ts';

export class Session {
  auth: Maybe<Partial<AuthBucket>>
  valid: boolean
  hydrated: boolean

  constructor(auth: Maybe<Partial<AuthBucket>>) {
    this.auth = auth;
    this.valid = false;
    this.hydrated = false;

  }

  getName(): string {
    return this.auth?.user_id || ''
  }

  isLoggedIn(): boolean {
    this.throwIfNotHydrated();
    return this.isAuthValid(this.auth)
       && this.auth.expires > nowTime()
  }



  resetAuth() {
    this.auth = null;
    this.valid = false;
    this.hydrated = false;
  }

  // Hydrated means startSession has been called
  hydrateAuth(auth: Maybe<Partial<AuthBucket>>): void {
    if (!this.isAuthValid(auth)) {
      this.auth = null;
      this.valid = false;
    }
    else {
      this.auth = auth as AuthBucket;
      this.valid = true;
    }
    this.hydrated = true;
  }

  // AuthBucket typegaurd.
  // Does NOT mean logged in.
  isAuthValid(auth: Maybe<Partial<AuthBucket>>): auth is AuthBucket {
    if (typeof auth === 'undefined' || null === auth) {
      return false;
    }
    for (const el of authKeys)
      if (el in auth && auth[el] === null)
        return false;
    return true;
  }

  throwIfNotHydrated(): void {
    if (!this.hydrated) {
      throw new Error('Session not yet started');
    }
  }
}