import {
  setCookie,
  getCookies,
  deleteCookie
} from "$std/http/cookie.ts"
import { AuthBucket } from "@/plugins/session/types.ts";
import { BASE_HOST } from "config";
// AKA the thing that deals with cookies.

export function setAuthCookies(data: AuthBucket, headers: Headers) {
  setCookie(headers, { name: "t", secure:true, path:"/", domain:BASE_HOST,value: data.token });
  setCookie(headers, { name: "p", secure:true, path:"/", domain:BASE_HOST,value: data.password });
  setCookie(headers, { name: "i", secure:true, path:"/", domain:BASE_HOST,value: data.user_id });
  setCookie(headers, { name: "e", secure:true, path:"/", domain:BASE_HOST,value: String(data.expires) });
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
  for (const el of ['token', 'password', 'user_id', 'expires']) {
    deleteCookie(headers, el)
  }
}

export function logout(res: Response) {
  killCookies(res.headers);
  return true;
}