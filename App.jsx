import { metaDefaults, gtag } from "./config.ts";

export function App(props) {
  const meta = {};
  for(const [key, value] of Object.entries(metaDefaults)) {
    if(props[key] == null) {
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

        <meta property="og:site_name" content={`Endlesss Rifff Share by ${meta.user}`}></meta>
        <meta property="og:type" content="article"></meta>

        <meta property="og:description" content={meta.description}></meta>
        <meta property="og:image" content={meta.display_image}></meta>
        <meta property="og:url" content={meta.share_url}></meta>
        <meta property="og:title" content={meta.title}></meta>

        <meta name="twitter:image:alt" content={meta.img_alt}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>

        {gtag}
        <title>{meta.title}</title>
      </head>
      <body>
        <h1>{meta.title}</h1>
        {props.children}
      </body>
    </html>
  );
}
