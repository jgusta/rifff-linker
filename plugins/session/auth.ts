import {
  deleteCookie,
  getCookies,
  setCookie,
} from '$std/http/cookie.ts';
import { AnyAuthBucket } from './types.ts';
import { encrypt, decrypt, getKey } from './crypto.ts';
import type { AuthBucket, AuthKeys } from './types.ts';
export const authKeys: AuthKeys = ['token', 'password', 'user_id', 'expires'];
type AnyAuth = AnyAuthBucket & { valid: boolean }
type ValidAuth = AnyAuth & AuthBucket & { valid: true }
type InvalidAuth = AnyAuth & { valid: false }
class Auth<T> implements AuthBucket {
  valid: true = true;
  token: string;
  password: string;
  user_id: string;
  expires: number;
  constructor(bucket: AuthBucket) {
    this.token    = bucket.token;
    this.password = bucket.password;
    this.user_id  = bucket.user_id;
    this.expires  = bucket.expires;
  }
}

export function getAuthFromCookies(headers: Headers) {
  const cookies = readAuthCookies(headers);
}

function setAuthCookies(data: AuthBucket, headers: Headers) {
  
  for (const key of authKeys) {
    if (key === 'expires') {
      const ex = new Date(data.expires);
      setCookie(headers, { name: "e", path: "/", value: String(data.expires), expires: ex });
    }
    else {
      setCookie(headers, { name: key, path: "/", value: data[key], expires: ex });
    }
  }
  setCookie(headers, { name: "t", path: "/", value: data.token, expires: ex });
  setCookie(headers, { name: "p", path: "/", value: data.password, expires: ex });
  setCookie(headers, { name: "i", path: "/", value: data.user_id, expires: ex });
}

export function logout(headers: Headers) {
  for (const el of ['t', 'p', 'i', 'e']) {
    deleteCookie(headers, el)
  }
  return true;
}