import type { Handlers } from "$fresh/server.ts";
// import file from "../static/topRifffs.json" with { type: "json" };
import { env } from 'config';
import topRifffs from "@/static/topRifffs.json"  with { type: "json" };
export const handler: Handlers = {
  async GET(req, ctx) {
    // const files = JSON.parse(await Deno.readTextFile("static/topRifffs.json"));

    const rifff_id = topRifffs[(topRifffs.length * Math.random()) | 0];
    return new Response(new Blob(), {
      status: 307,
      headers: {
        location: new URL(`/rifff/${rifff_id}`, env.BASE_URL).href,
      },
    })
  }
}
