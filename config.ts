const environment = Deno.env.get("DEPLOYMENT") || "local";
let url;
let port;
console.log(`Environment: ${environment}`);
switch (environment) {
  case "local":
    url = "http://127.0.0.1:8000";
    port = 8000
    break;
  case "production":
    url = Deno.env.get("BASEURL");
    port = 80
    break;
  default:
    throw new Error("bad environment");
}

const baseUrl = url;

const metaDefaults = {
  description: "Endlesss Rifff Viewer",
  display_image: `${baseUrl}/splat.png`,
  share_url: `${baseUrl}`,
  title: "Endlesss Rifff Viewer",
  img_alt: "Endlesss Rifff Viewer",
  user: ""
};

const gtag = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8S6C1W2WQP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-8S6C1W2WQP');
</script>
`
export {baseUrl, metaDefaults, port, gtag}

