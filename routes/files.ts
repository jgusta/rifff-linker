import type { Handlers } from "$fresh/server.ts"
export const handler: Handlers = {
  async GET(req, ctx) {
    const entries = []
    for await (const entry of Deno.readDir(".")) {
      entries.push(entry)
    }

    const list = entries
      .map((entry) => {
        return `<li>${entry.name}</li>`
      })
      .join("")

    return new Response(`<ul>${list}</ul>`, {
      headers: {
        "content-type": "text/html",
      },
    })
  },
}
