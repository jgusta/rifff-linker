import { TEST_RIFFF } from "config";
import { RifffResponse } from "types";

export async function getFakeRifff() {
  const text = await Deno.readTextFile(TEST_RIFFF);
  const jobj:unknown = JSON.parse(text);
  const rifff = (jobj as RifffResponse).data[0];
  return rifff;
}