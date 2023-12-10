import type { Handlers } from "$fresh/server.ts";
import { env } from 'config';

export const handler: Handlers = {
  async GET(req, ctx) {
    // const files = JSON.parse(await Deno.readTextFile("static/topRifffs.json"));
    const topRifffs = await import("../util/topRifffs.ts")
    if (!Array.isArray(topRifffs)) throw new Error("topRifffs is not an array");
    const rifff_id = topRifffs[(topRifffs.length * Math.random()) | 0];
    return new Response(new Blob(), {
      status: 307,
      headers: {
        location: new URL(`/rifff/${rifff_id}`, env.BASE_URL).href,
      },
    })
  }
}
