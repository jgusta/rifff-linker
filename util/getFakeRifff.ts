import { TEST_RIFFF } from "config";
import { RifffResponse } from "types";
import { join, isAbsolute, normalize } from "https://deno.land/std@0.160.0/path/mod.ts";

export async function getFakeRifff() {
  let filepath;
  if (isAbsolute(TEST_RIFFF)) {
    filepath = normalize(TEST_RIFFF)
  }
  else {
    filepath = join("../", TEST_RIFFF)
  }
  if (typeof Deno === 'undefined') {
    throw new Error('Cannot grab test rifff file from browser')
  }
  const text = await Deno.readTextFile(filepath);
  const jobj: unknown = JSON.parse(text);
  const rifff = (jobj as RifffResponse).data[0];
  return rifff;
}