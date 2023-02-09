"use strict";
import { crypto } from 'https://deno.land/std@0.177.0/crypto/crypto.ts';
import { base64DecToArr, base64EncArr, strToUTF8Arr, UTF8ArrToStr } from "./util.ts";

export async function encrypt(plaintext: string, cryptoKey:CryptoKey): Promise<string> {
  const bufferText = strToUTF8Arr(plaintext);
  // getRandomValues operates directly on the input Array.
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const params = {
    name: "AES-GCM",
    iv
  }
  const cypherarray = await crypto.subtle.encrypt(params, cryptoKey, bufferText)
  return `${base64EncArr(new Uint8Array(cypherarray))}|${base64EncArr(iv)}`;
}

export async function decrypt(data: string, cryptoKey: CryptoKey) {
  const [cyphertext, ivtext] = data.split('|');
  const cypherarray = base64DecToArr(cyphertext, 8);
  const iv = base64DecToArr(ivtext, 8);
  const params = {
    name: "AES-GCM",
    iv
  }
  try {
  const bufferText = await crypto.subtle.decrypt(params, cryptoKey, cypherarray);
    const plaintext = UTF8ArrToStr(new Uint8Array(bufferText));
    return plaintext;
  }
  catch(e) {
    console.log(e)

      throw e;
  }

}
