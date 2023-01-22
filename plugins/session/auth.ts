import {
  deleteCookie,
  getCookies,
  setCookie,
} from '$std/http/cookie.ts';

import type { AuthBucket } from './types.ts';

// AKA the thing that deals with cookies.

export function setAuthCookies(data: AuthBucket, headers: Headers) {
  const ex = new Date(data.expires);
  setCookie(headers, { name: "t", path:"/", value: data.token, expires: ex });
  setCookie(headers, { name: "p", path:"/", value: data.password, expires: ex });
  setCookie(headers, { name: "i", path:"/", value: data.user_id, expires: ex });
  setCookie(headers, { name: "e", path:"/", value: String(data.expires), expires: ex });
}

// Retrieve what is possibly a valid auth from cookies
export function readAuthCookies(headers: Headers): Partial<AuthBucket> {
  const cookies = getCookies(headers)
  const out: Partial<AuthBucket> = {
    token: cookies.t || undefined,
    password: cookies.p || undefined,
    user_id: cookies.i || undefined,
    expires: cookies.e ? Number(cookies.e) : undefined,
  }
  return out;
}

export function logout(headers: Headers) {
  for (const el of ['t', 'p', 'i', 'e']) {
    deleteCookie(headers, el)
  }
  return true;
}