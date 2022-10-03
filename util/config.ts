import { config } from "dotenv";
import { cleanEnv, host, port, str, url, email } from "envalid";

const raw_env = Object.assign(Deno.env.toObject(), await config());

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
  PORT: port({default: 8000, desc:"Port number."}),
  GA_ID: str({ default: '' }),
  ENVIRONMENT: str({ choices: ["development", "test", "production"], desc:"'development', 'test' or 'production'" }),
  BASE_URL: url({ default: base_url, desc: "The base url of the web site, no trailing slash. Autofilled using BASE_HOST and PORT, but can be overridden explicitly.", example: "https://www.example.com" }),
  TWITTER: str({ default: '', desc: "Twitter handle of operator, no '@' symbol.", example: "mytwitter" }),
  REFERER: url({ default: base_url, desc: "(sic) The url of the website that is requesting from the Endlesss API." }),
  FROM: email({ desc: "Contact email to identify service to Endlesss API", example: "youremail@example.com" })
});
console.log(env)
export const { TWITTER, BASE_URL, ENVIRONMENT, GA_ID, PORT, FROM, REFERER } = env;

export { env }

