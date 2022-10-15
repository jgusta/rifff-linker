import { BASE_URL, ENVIRONMENT, TEST_INPUT_LINK, TEST_RIFFF } from "config";
import { readJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { RifffResponse, Rifff } from "../../util/types.ts";

export async function getFakeRifff() {
  const f: unknown = await readJson(TEST_RIFFF);
  const rifff = (f as RifffResponse).data[0];
  return rifff;
}