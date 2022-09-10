const environment = Deno.env.get("DEPLOYMENT") || "local";
let url;
let port;
console.log(`Environment: ${environment}`);
switch (environment) {
  case "local":
    url = "http://localhost:8000";
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
};

export {baseUrl, metaDefaults, port}

