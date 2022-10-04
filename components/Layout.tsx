import { Head } from "https://deno.land/x/fresh@1.1.1/runtime.ts";
import { JSX } from "preact/jsx-runtime";
import { ENVIRONMENT, GA_ID, TWITTER } from "config";
import { makeMeta, PageMeta } from "meta";
import Nav from "@components/Nav.tsx";
import Footer from "@components/Footer.tsx";
import { apply,tw } from "twind";

export const Layout = ({ meta, children }: {
  meta: Partial<PageMeta>;
  children: JSX.Element;
}) => {
  const {
    canonical,
    description,
    display_image,
    img_alt,
    share_url,
    site_name,
    title,
    twitter_creator,
    user,
  } = makeMeta({ ...meta });

  return (
    <body class={tw`bg-gray-900 font-sans`}>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:site_name" content={site_name} />
        <meta property="og:type" content="website" />

        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={display_image} />
        <meta property="og:url" content={share_url} />
        <meta property="og:image:alt" content={img_alt} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={display_image} />
        <meta name="twitter:url" content={share_url} />
        <meta name="twitter:image:alt" content={img_alt} />

        <meta name="twitter:card" content="summary_large_image" />
        {TWITTER
          ? <meta name="twitter:creator" content={`@` + twitter_creator} />
          : ""}
        {TWITTER
          ? <meta name="twitter:site" content={`@` + twitter_creator} />
          : ""}

        <title>{title}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        >
        </link>
        <link
          href="https://fonts.googleapis.com/css2?family=Questrial&family=Rubik:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        >
        </link>
        <link
          rel="stylesheet"
          href="style.css"
          type="text/css"
          charSet="utf-8"
        />

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
      </Head>
      <Nav />
      {children}
      <Footer></Footer>
    </body>
  );
};
