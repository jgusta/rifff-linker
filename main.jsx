/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";
import { Router, Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { baseUrl, port, metaDefaults } from "./config.ts";
// import { App } from "./App.jsx";
import { checkId, headers } from "./util.ts";



const router = new Router()

const getSharedRifff = async (id) => {
      try {
        const resp = await fetch('https://endlesss.fm/api/v3/feed/shared_rifff/' + id);
        const json = await resp.json();
        const arr = json;
        return arr.data[0];
      } catch (error) {
        throw new Error(error);
      }
}

function Main(props) {
  return (
    <div>
      <a href="{props.forwardUrl}"></a>
    </div>
  );
}
function App(props) {
  const meta = {};
  for (const [key, value] of Object.entries(metaDefaults)) {
    if (props[key] == null) {
      meta[key] = value;
    } else {
      meta[key] = props[key];
    }
  }

  return (
    <html>
      <head>
        <meta charset="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="stylesheet" href="/assets/style.css" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content="Create an easy-to-share link for your Endlesss rifffs" />

        <meta property="og:site_name" content="Endlesss Rifff Share"></meta>
        <meta property="og:type" content="article"></meta>

        <meta property="og:description" content={meta.description}></meta>
        <meta property="og:image" content={meta.display_image}></meta>
        <meta property="og:url" content={meta.share_url}></meta>
        <meta property="og:title" content={meta.title}></meta>

        <meta name="twitter:image:alt" content={meta.img_alt}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>

        <title>{meta.title}</title>
      </head>
      <body>
        <h1>{meta.title}</h1>
        {props.children}
      </body>
    </html>
  );
}
function notFound() {
  return renderSSR(<App>Sorry Not Found</App>);
}

// router.get("/assets/style.css", async ({response}) => {
//   console.log("css run");
//   const file = await Deno.readFile("./assets/style.css");
//   response.headers.set(...headers.css);
//   response.body=file;
// })

// router.get("/favicon.ico", async ({response}) => {
//   const file = await Deno.readFile("./assets/favicon.ico");
//   response.headers.set(...headers.ico);
//   response.body = file;
// })

router.get("/rifff/:rifffId", async (ctx) => {
  console.log("riff run", ctx);
  const rifffId = ctx.params.rifffId;
  const rifffData = await getSharedRifff(rifffId);
  if (!(await checkId(rifffId))) {
    ctx.response.body = notFound();
    ctx.response.headers.set(...headers.html)
    return
  }

  const shareImage = rifffData.image_url;
  const time = rifffData.action_timestamp_iso;
  const user = rifffData.user;
  const feats = rifffData.creators.filter(x=>x!=user).join(", ")
  const title= `${rifffData.title}`;
  // const shareImage = buildUrl("https://api.endlesss.fm", {
  //   path: ["api", "v3", "image", "shared_rifff", rifffId],
  //   queryParams: {
  //     nodefault: null,
  //   },
  // });
  const shareUrl = `${baseUrl}/rifff/${rifffId}`;
  const forwardUrl = `https://endlesss.fm/rifff-link?type=shared&rifffId=${rifffId}`;
  const desc = feats.length ? `by ${user} feat ${feats} - Created @ ${time}`: `by ${user} - Created @ ${time}`
  const r = renderSSR(
    <App
      description={desc}
      display_image={shareImage}
      title={title}
      share_url={shareUrl}
      img_alt="img alt"
    >
      <Main forwardUrl={forwardUrl} />
    </App>
  );

  ctx.response.headers.set(...headers.html)
  ctx.response.body = r
});


//endlesss://sharedrifff/ca5298b030e811ed98b0365bb593d1c3
//http://localhost:8000/rifff/ca5298b030e811ed98b0365bb593d1c3
router.get("/", ({response}) => {
  console.log("default run");
  console.log(response);
  const r = renderSSR(<App>Welcome to page</App>);
  response.headers.set(...headers.html)
  response.body = r;
})

const serve = new Application();

serve.use(router.routes());
serve.use(router.allowedMethods());
serve.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/assets`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});
console.log(`listening at ${baseUrl}`)
await serve.listen({ port });