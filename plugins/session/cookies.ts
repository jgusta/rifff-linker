import { decrypt, getKey } from "./crypto.ts";
import { getCookies } from "./deps.ts";
import { Cookies } from "./types.ts";

export async function readEncryptedCookies(headers: Headers): Promise<Cookies> {
  const encryptedCookies = getCookies(headers);
  const cypher = encryptedCookies.c;
  try {
    const key = await getKey();
    const json = await decrypt(cypher, key);
    const jsonParsed = JSON.parse(json);
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