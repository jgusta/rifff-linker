const port = 8080;

async function handler(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    const method = requestEvent.request.method;
    const path = decodeURIComponent(url.pathname);
    console.log(path)
    switch (method) {
      case 'POST': {
        switch (path) {
          case '/auth/login': {
            const file = await Deno.open('docs/research/mockserver/auth.json', { read: true })
            const readableStream = file.readable;
            const res = new Response(readableStream, {
              status: 200,
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              }
            });
            await requestEvent.respondWith(res);
            break;
          }
          default: {

            const res = new Response(null, {
              status: 404
            });
            await requestEvent.respondWith(res);
    }}}}}}



const server = Deno.listen({ port });
console.log(`Dummy server running on http://localhost:${port}`);

for await (const conn of server) {
  handler(conn).catch(console.error);
}

