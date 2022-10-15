import { FROM, REFERER, TEST_RIFFF } from "config";
import { RifffResponse, Rifff } from "types";
import { getFakeRifff } from "@api/fakeRifff.tsx";

export async function getRifffData(rifffId: string): Promise<Rifff> {
  if (TEST_RIFFF.length) {
    return await getFakeRifff();
  } else {
    const resp = await fetch(
      "https://endlesss.fm/api/v3/feed/shared_rifff/" + rifffId,
      {
        headers: new Headers({
          "User-Agent": "Endlesss Rifff Linker/1.0 DenoDeploy",
          "From": FROM,
          "Referer": REFERER
        })
      });
    const result: unknown = await resp.json();
    const rifff = (result as RifffResponse).data[0];
    return rifff;
  }
}

