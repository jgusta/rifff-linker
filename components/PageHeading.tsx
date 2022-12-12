import { Head } from '$fresh/runtime.ts';
import {
  ENVIRONMENT,
  GA_ID,
} from 'config';
import { makeMeta } from 'meta';
import { PageMeta } from 'types';

export default function PageHeading({ meta }: { meta: Partial<PageMeta> }) {
  const {
    canonical, description, display_image, img_alt, share_url, site_name, title
  } = makeMeta({ ...meta });
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:type" content="website" />

      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
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
      {/* {TWITTER
        ? <meta name="twitter:creator" content={`@` + twitter_creator} />
        : ""}
      {TWITTER
        ? <meta name="twitter:site" content={`@` + twitter_creator} />
        : ""} */}
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Questrial&family=Rubik:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/style.css" type="text/css" charSet="utf-8" />
      {ENVIRONMENT === "production" ? (<>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
        <script async dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag() { 
                    dataLayer.push(arguments); 
                  }
                  gtag('js', new Date()); gtag('config', '${GA_ID}');`,
        }}></script></>) : <></>}
      <script src="/js/rifff/playback/oggmented-wasm.js"></script>
      <script src="/js/rifff/playback/rifff-player.js"></script>
      <script src="/js/rifff/playback/looper.js"></script>
      <script src="/js/rifff/playback/playbackcontroller.js"></script>
      <script src="/js/rifff/playback/rifff.js"></script>
      <script src="/js/rifff/auto-level-mixer.js"></script>
      <script src="/js/rifff/compressor.js"></script>
      <script src="/js/rifff/rifff-icon.js"></script>
      <script src="/js/rifff/unmute.js"></script>
      <script src="/js/docReady.js"></script>
      <script async dangerouslySetInnerHTML={{
          __html: `docReady(()=>{window.player = new window.RifffPlayer();});`
      }}></script>

    </Head>
  );
}
