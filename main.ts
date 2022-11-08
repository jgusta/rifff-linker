/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { Manifest, start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "@/twind.config.ts";
import session from "@session";
import { PORT } from "config";

await start(manifest as unknown as Manifest, { plugins: [twindPlugin(twindConfig), session()], port: PORT });
