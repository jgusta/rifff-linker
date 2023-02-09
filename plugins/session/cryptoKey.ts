import { stringToKey } from "./util.ts";
let cryptoKey: CryptoKey | undefined;

export async function getKey(secret: string | undefined): Promise<CryptoKey> {
  if (typeof cryptoKey != 'undefined') {
    return Promise.resolve(cryptoKey)
  }
  if (typeof secret == 'undefined') {
    secret = (Deno.env.get('SESSION_SECRET') as string)
  }

  const key_1 = await stringToKey(secret);
  cryptoKey = key_1;
  return key_1;
}

