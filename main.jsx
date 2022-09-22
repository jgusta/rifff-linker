import { App } from "./App.jsx";
import { baseUrl, port } from "./config.ts";
import { getSharedRifff } from "./routes/api/getSharedRifff.ts";
// import { App } from "./App.jsx";
import { checkId, headers, docTypeMiddleware } from "./util.ts";


const router = new Router()

function Main(props) {
  return (
    <div>
      <a href="{props.forwardUrl}"></a>
    </div>
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
  const title = `${rifffData.title}`;
  // const shareImage = buildUrl("https://api.endlesss.fm", {
  //   path: ["api", "v3", "image", "shared_rifff", rifffId],
  //   queryParams: {
  //     nodefault: null,
  //   },
  // });
  const shareUrl = `${baseUrl}/rifff/${rifffId}`;
  const forwardUrl = `https://endlesss.fm/rifff-link?type=shared&rifffId=${rifffId}`;
  const desc = feats.length ? `feat ${feats} - Created @ ${time}`: `Created @ ${time}`
  const r = renderSSR(
    <App
      description={desc}
      display_image={shareImage}
      title={title}
      share_url={shareUrl}
      img_alt="img alt"
      user={user}
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


// add doctype to response
serve.use(async (ctx, next) => {
  await next();
  const ctype = ctx.response.headers.get("content-type");
  const thebody = String(ctx.response.body);
  console.log(ctype);
  if (ctype === 'text/html') {
    ctx.response.body = `<!DOCTYPE html>${thebody}`;
  }
  console.log(thebody);
});
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
serve.use(router.routes());
serve.use(router.allowedMethods());
await serve.listen({ port });