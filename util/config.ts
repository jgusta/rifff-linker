import { config } from "dotenv";
import { cleanEnv, host, port, str, url } from "envalid";

const RAW_ENV = Object.assign(Deno.env.toObject(), await config());
const BASE_ENV = cleanEnv(RAW_ENV, {
  BASE_HOST: host({default: "127.0.0.1"}),
  PORT: port({ default: 8000 })
});

let base_url='';
if (BASE_ENV.PORT == 443){
  base_url = `https://${BASE_ENV.BASE_HOST}`;
}
else if (BASE_ENV.PORT == 80) {
  base_url = `http://${BASE_ENV.BASE_HOST}`;
}
else {
  base_url = `http://${BASE_ENV.BASE_HOST}:${BASE_ENV.PORT}`;
}

const env = cleanEnv(RAW_ENV, {
  GA_ID: str({default:''}),
  ENVIRONMENT: str({ choices: ["development", "test", "production"] }),
  BASE_URL: url({ default: base_url})
});

const metaDefaults = {
  description: "Create an easy-to-share link for your Endlesss rifffs",
  site_name: "Endlesss Riff Linker",
  display_image: `${env.BASE_URL}/splat.png`,
  share_url: `${env.BASE_URL}`,
  title: "Endlesss Rifff Viewer",
  img_alt: "Endlesss Rifff Viewer",
  user: ""
};

export const {BASE_URL, ENVIRONMENT, GA_ID } = env;

export { env, metaDefaults }

