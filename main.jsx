/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";
import { buildUrl } from "https://deno.land/x/url_builder/mod.ts";

function App(props) {
  return (
    <html>
      <head>
        <meta charset="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:type" content="article"></meta>
        <meta
          property="og:description"
          content={props.description}
        ></meta>
        <meta property="og:image" content={props.display_image}></meta>
        <meta property="og:url" content={props.share_url}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta property="og:site_name" content="Endlesss Rifff Share"></meta>
        <meta
          name="twitter:image:alt"
          content={props.img_alt}
        ></meta>
        <meta property="og:title" content="Digits - Endlesss Jam Player"></meta>
        <link rel="stylesheet" href="assets/style.css" />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world</h1>
      </body>
    </html>
  );
}

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world</h1>
      </body>
    </html>
  );
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/assets/style.css")) {
    const file = await Deno.readFile("./assets/style.css");
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }
  else if (pathname.startsWith("/favicon")) {
      const file = await Deno.readFile("./assets/favicon.ico");
      return new Response(file, {
        headers: {
          "content-type": "image/x-icon",
        },
      });
  }

  

  // endlesss://sharedrifff/fa6808b02b0b11ed88b0b48870128733
  const pattern = new URLPattern({ pathname: "/rifff/:id" });
  //const match = pattern.exec(pathname);
  const rifff_id = pattern.exec(pathname).pathname.groups.id;
  const regex = /^[a-f0-9A-F]{32}$/;
  const check = rifff_id.match(regex);
  if (check === null) {
    return new Response(
      `<html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Rifff not found</h1>
      </body>
    </html>`,
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      }
    );
  }
//"Listen to this live jam on Endlesss. Endlesss.fm - Multiplayer Music";
  const share_image = buildUrl("https://api.endlesss.fm", {
    path: ["api", "v3", "image", "shared_rifff", check],
    queryParams: {
      nodefault: null
    }
  });

  // https://api.endlesss.fm/api/v3/image/shared_rifff/1640731026fc11edb3100ca7db7b68e2?nodefault

  const html = renderSSR(
    <App
      rifff_id={check}
      description="something"
      share_image={share_image}
      img_alt=""
    />
  );


  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="assets/style.css" />
      </head>
      <body>
        <h1>Example</h1>
        <img src="${jump}">
      </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
}

serve(handleRequest);
