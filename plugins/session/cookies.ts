import { setCookie } from "https://deno.land/std/http/cookie.ts";
import { authKeys } from "./auth.ts";
import { decrypt, getKey } from "./crypto.ts";
import { getCookies } from "./deps.ts";
export type CookieStatus = "INIT" | "EXPIRED" | "VALID";
export type CookieEnum = {[k in CookieStatus]: k};
export interface Cookies extends Record<string, string | number> {
  expires: number;
  [key: string]: string | number;
}


export async function readEncryptedCookies(headers: Headers): Promise<Cookies> {
  const encryptedCookies = getCookies(headers);
  const cypher = encryptedCookies.c;
  try {
    const key = await getKey();
    const json = await decrypt(cypher, key);
    const jsonParsed = await Promise.resolve(
      ((x: string) => JSON.parse(x))(json),
    );
    if (!jsonParsed || "expires" in jsonParsed === false) {
      throw new Error("Invalid JSON");
    }
    return jsonParsed;
  } catch (e) {
    console.log(e);
    const defaultRecord = { expires: 0 };
    return defaultRecord;
  }
}

export async function setEncryptedCookies(data: AuthBucket, headers: Headers) {
  let ex;
  for (const key of authKeys) {
    if (key === "expires") {
      ex = new Date(data.expires);
      setCookie(headers, {
        name: "e",
        path: "/",
        value: String(data.expires),
        expires: ex,
      });
    } else {
      setCookie(headers, {
        name: key,
        path: "/",
        value: data[key],
        expires: ex,
      });
    }
  }
  for (
    const [name, value] of [
      ["t", data.token],
      ["p", data.password],
      ["i", data.user_id],
    ]
  ) setCookie(headers, { name, path: "/", value, expires: ex });

  setCookie(headers, {
    name: "p",
    path: "/",
    value: data.password,
    expires: ex,
  });
  setCookie(headers, {
    name: "i",
    path: "/",
    value: data.user_id,
    expires: ex,
  });
}
