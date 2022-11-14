import { config } from 'dotenv';
import {
  cleanEnv,
  email,
  host,
  port,
  str,
} from 'envalid';

const raw_env = Object.assign(Deno ? Deno.env.toObject() : {}, await config());

// these are checked first so we can make a default BASE_URL
const base_env = cleanEnv(raw_env, {
  BASE_HOST: host({ desc: "Mandatory hostname to serve as." }),
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
  API_BASE: str({ desc: 'ends with shared_rifff, no trailing' }),
  BASE_HOST: str({ default: base_env.BASE_HOST }),
  BASE_URL: str({ default: base_url, desc: "The base url of the web site, no trailing slash. Autofilled using BASE_HOST and PORT, but can be overridden explicitly.", example: "https://www.example.com" }),
  ENVIRONMENT: str({ choices: ["development", "test", "production"], desc: "'development', 'test' or 'production'" }),
  FROM: email({ desc: "Contact email to identify service to Endlesss API", example: "youremail@example.com" }),
  GA_ID: str({ default: '' }),
  LOGIN_ENDPOINT: str({ desc: 'remote login endpoint' }),
  LOGTAIL_KEY:str({desc: 'Logtail key (optional)', default:''}),
  PORT: port({ default: 8000, desc: "Port number." }),
  REFERER: str({ default: base_url, desc: "The url of the website that is requesting from the Endlesss API." }),
  SESSION_ENDPOINT: str({ desc: 'remote session endpoint' }),

  SITE_NAME: str({ default: 'Rifff Linker', desc: 'The title of the site used in the header.' }),
  TEST_INPUT_LINK: str({ default: '' }),
  TEST_RIFFF: str({ default: '', desc: 'For testing, specify a path to json rifff here. It should be relative to root dir.' }),
  TWITTER: str({ default: '', desc: "Twitter handle of operator, no '@' symbol.", example: "mytwitter" }),
  USER_AGENT: str({ default: 'Endlesss Rifff Linker/1.0', desc: 'Identify yourself to api' }),
});

export const {
  API_BASE,
  BASE_HOST,
  BASE_URL,
  ENVIRONMENT,
  FROM,
  GA_ID,
  LOGIN_ENDPOINT,
  LOGTAIL_KEY,
  PORT,
  REFERER,
  SESSION_ENDPOINT,
  SITE_NAME,
  TEST_INPUT_LINK,
  TEST_RIFFF,
  TWITTER,
  USER_AGENT
} = env;

export { env };
