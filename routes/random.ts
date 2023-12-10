import type { Handlers } from "$fresh/server.ts";
import { env } from 'config';

export const handler: Handlers = {
  async GET(req, ctx) {
    // const files = JSON.parse(await Deno.readTextFile("static/rifffs.json"));
    const rifffList = await import("@/util/topRifffs.ts")
    const rifffs = rifffList.rifffs;
    if (!Array.isArray(rifffs)) throw new Error("rifffs is not an array");
    const rifff_id = rifffs[(rifffs.length * Math.random()) | 0];
    return new Response(new Blob(), {
      status: 307,
      headers: {
        location: new URL(`/rifff/${rifff_id}`, env.BASE_URL).href,
      },
    })
  }
}
