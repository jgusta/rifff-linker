import { stringToKey } from "./util.ts";
let cryptoKey:CryptoKey|undefined;

export async function getKey(secret:string|undefined): Promise<CryptoKey> {
  if (typeof cryptoKey == 'undefined') {
    if (typeof secret == 'undefined') {
      secret = (Deno.env.get('SESSION_SECRET') as string)
    }
    cryptoKey = await stringToKey(secret);
  }
  return cryptoKey;
}