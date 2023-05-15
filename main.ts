/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference types="./endlesss.types.d.ts" />
/// <reference lib="deno.ns" />
import { emotionPlugin } from "fresh_emotion";
import { Manifest, start } from "$fresh/server.ts";
import { BASE_HOST, PORT } from "config";

const cookies = {
  token: "",
  password: "",
  user_id: "",
  expires: 0,
};

import manifest from "@/fresh.gen.ts";
import sessionPlugin from "@session";

await start(manifest as unknown as Manifest, {
  plugins: [sessionPlugin(cookies), emotionPlugin()],
  port: PORT,
  hostname: BASE_HOST,
});
