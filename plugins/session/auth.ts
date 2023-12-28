import {
  deleteCookie,
  getCookies,
  setCookie,
} from '$std/http/cookie.ts';
import { readEncryptedCookies } from "./cookies.ts";
export const authKeys = ['token', 'password', 'user_id', 'expires'];
class Auth {
  valid: true = true;
  token: string;
  password: string;
  user_id: string;
  expires: number;
  constructor(bucket) {
    this.token    = bucket.token;
    this.password = bucket.password;
    this.user_id  = bucket.user_id;
    this.expires  = bucket.expires;
  }
}

export function getAuthFromCookies(headers: Headers) {
  const cookies = readEncryptedCookies(headers);
  
}

function setAuth(data: Auth, headers: Headers) {
  const ex = new Date(data.expires);
  for (const key of authKeys) {
    if (key === 'expires') {
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