import { FROM, REFERER, TEST_RIFFF, USER_AGENT } from "config";
import { RifffResponse, Rifff } from "types";
import { getFakeRifff } from "./getFakeRifff.ts";

export async function fetchRifff(rifff_id: string): Promise<Rifff> {
  if (TEST_RIFFF.length) {
    const resp = await getFakeRifff();
    const rifff = resp;
    return rifff
  } else {
    const resp = await fetch(
      "https://endlesss.fm/api/v3/feed/shared_rifff/" + rifff_id,
      {
        headers: new Headers({
          "User-Agent": USER_AGENT,
          "From": FROM,
          "Referer": REFERER
        })
      });
    const result: unknown = await resp.json();
    const rifff = (result as RifffResponse).data[0];
    return rifff;
  }
}

