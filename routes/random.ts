import type { Handlers } from "$fresh/server.ts";
import { env } from 'config';
export const handler: Handlers = {
  async GET(req, ctx) {
    const files = JSON.parse(await Deno.readTextFile("static/topRifffs.json"));
    if (!Array.isArray(files)) {
      throw new Error("Rifff list not found");
    }
    const rifff_id = files[files.length * Math.random() | 0];
    return new Response(new Blob(), {
      status: 307,
      headers: {
        location: new URL(`/rifff/${rifff_id}`, env.BASE_URL).href,
      },
    })
  }
}
