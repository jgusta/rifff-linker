import { config } from "dotenv";
import { cleanEnv, host, port, str, email } from "envalid";

const raw_env = Object.assign(Deno ? Deno.env.toObject() : {}, await config());

// these are checked first so we can make a default BASE_URL
const base_env = cleanEnv(raw_env, {
  BASE_HOST: host({ default: "127.0.0.1" }),
  PORT: port({ default: 8000 })
});

let base_url = '';
if (base_env.PORT == 443) {
  base_url = `https://${base_env.BASE_HOST}`;
}
else if (base_env.PORT == 80) {
  base_url = `http://${base_env.BASE_HOST}`;
}
else {
  base_url = `http://${base_env.BASE_HOST}:${base_env.PORT}`;
}

const env = cleanEnv(raw_env, {
  PORT: port({ default: 8000, desc: "Port number." }),
  GA_ID: str({ default: '' }),
  ENVIRONMENT: str({ choices: ["development", "test", "production"], desc: "'development', 'test' or 'production'" }),
  BASE_URL: str({ default: base_url, desc: "The base url of the web site, no trailing slash. Autofilled using BASE_HOST and PORT, but can be overridden explicitly.", example: "https://www.example.com" }),
  SITE_NAME: str({ default: 'Rifff Linker', desc: 'The title of the site used in the header.' }),
  TWITTER: str({ default: '', desc: "Twitter handle of operator, no '@' symbol.", example: "mytwitter" }),
  REFERER: str({ default: base_url, desc: "The url of the website that is requesting from the Endlesss API." }),
  FROM: email({ desc: "Contact email to identify service to Endlesss API", example: "youremail@example.com" }),
  TEST_RIFFF: str({ default: '', desc: 'For testing, specify a json rifff here.' }),
  TEST_INPUT_LINK: str({ default: '' }),
  LOG_TOKEN: str({ default: '' })
});

export const { TWITTER, BASE_URL, SITE_NAME, TEST_RIFFF, ENVIRONMENT, GA_ID, PORT, FROM, REFERER, TEST_INPUT_LINK, LOG_TOKEN } = env;

export { env }

