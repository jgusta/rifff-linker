import { apply } from "twind";
import { asset, Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { BASE_URL, ENVIRONMENT, GA_ID, metaDefaults } from "config";

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
};

export const Nav = (props:PageProps) => (
  <div class="bg-teal-500">
    <nav class="flex items-center justify-between flex-wrap max-w-screen-md mx-auto">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/">
          <img
            src={asset("/videopoker-academy-deno.svg")}
            width={100}
            alt="the video poker academy logo: deno the dino behind some cards"
          />
        </a>
        <a href="/">
          <span class="font-semibold text-xl tracking-tight">
            Video Poker Academy
          </span>
        </a>
      </div>
    </nav>
  </div>
);

export const Layout = (props) => {
  const _meta = props.meta || {};
  const temp: {
    [key: string]: string;
  } = {};
  for (const [key, value] of Object.entries(_meta)) {
    if (value == undefined) {
      temp[key] = metaDefaults[key];
    } else {
      temp[key] = _meta[key];
    }
  }
  const meta = temp;
  console.log(meta);
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        >
        </meta>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content={meta.description} />

        <meta property="og:site_name" content={meta.site_name}></meta>
        <meta property="og:type" content="article"></meta>

        <meta property="og:description" content={meta.description}></meta>
        <meta property="og:image" content={meta.display_image}></meta>
        <meta property="og:url" content={meta.share_url}></meta>
        <meta property="og:title" content={meta.title}></meta>

        <meta name="twitter:image:alt" content={meta.img_alt}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        {ENVIRONMENT === "production"
          ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              >
              </script>
              <script
                async
                dangerouslySetInnerHTML={{
                  __html:
                    `window.dataLayer = window.dataLayer || [];function gtag() { 
                    dataLayer.push(arguments); 
                  }
                  gtag('js', new Date()); 
                  gtag('config', '${GA_ID}');`,
                }}
              >
              </script>
            </>
          )
          : <></>}

        <title>{meta.title}</title>
      </Head>
      <Nav />
      {props.children}
    </>
  );
};

export default function Home(props:PageProps) {
  const meta = {
    description: "Create an easy-to-share link for your Endlesss rifffs",
    site_name: "Endlesss Riff Linker",
    display_image: `${BASE_URL}/splat.png`,
    share_url: `${BASE_URL}`,
    title: "Endlesss Rifff Viewer",
    img_alt: "Endlesss Rifff Viewer",
    user: "",
  };

  return (
    <>
      <Layout meta={meta}>
        <div class="p-4 mx-auto max-w-screen-md">
          <p class="my-6">
            Welcome to `fresh`. Try updating this message in the
            ./routes/index.tsx file, and refresh.
          </p>
        </div>
        <div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
          <div class="sm:flex sm:items-center px-6 py-4">
            <img
              class="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
              src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4"
              alt=""
            />{" "}
            <div class="text-center sm:text-left sm:flex-grow">
              <div class="mb-4">
                <p class="text-xl leading-tight">Adam Wathan</p>
                <p class="text-sm leading-tight text-gray-400">
                  Developer at NothingWorks Inc.
                </p>
              </div>
              <div>
                <button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border-2 border-purple-400 text-purple-500 hover:bg-purple-600 hover:text-white">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
