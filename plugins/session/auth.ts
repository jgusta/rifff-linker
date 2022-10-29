import {
  setCookie,
  getCookies,
  deleteCookie
} from "$std/http/cookie.ts"
import { AuthBucket } from "./types.ts";

export function setAuthCookies(data: AuthBucket, headers: Headers) {
  setCookie(headers, { name: "t", value: data.token });
  setCookie(headers, { name: "p", value: data.password });
  setCookie(headers, { name: "i", value: data.user_id });
  setCookie(headers, { name: "e", value: String(data.expires) });
}

// Retrieve what is possibly a valid auth from cookies
export function readAuthCookies(headers: Headers): Partial<AuthBucket> {
  const cookies = getCookies(headers)
  const out: Partial<AuthBucket> = {
    token: cookies.token || undefined,
    password: cookies.password || undefined,
    user_id: cookies.user_id || undefined,
    expires: cookies.expires ? Number(cookies.expires) : undefined,
  }
  return out;
}

export function killCookies(headers: Headers) {
  for (const el of keys) {
    deleteCookie(headers, el)
  }
}

const keys: (keyof AuthBucket)[] = ['token', 'password', 'user_id', 'expires'];

// Return true if auth is a valid AuthBucket type.
// Does NOT mean logged in.
export function isAuthValid(auth: Partial<AuthBucket>): auth is AuthBucket {
  for (const el of keys) {
    if (el in auth && auth[el] === null) {
      return false;
    }
  }
  return true;
}

export function logout(res: Response) {
  killCookies(res.headers);
  return true;
}