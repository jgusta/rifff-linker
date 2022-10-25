/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference types="./endlesss.types" />
/// <reference lib="deno.ns" />

import twindPlugin from '$fresh/plugins/twind.ts';
import {
  Manifest,
  start,
} from '$fresh/server.ts';
import {
  BASE_HOST,
  PORT,
} from 'config';

import manifest from '@/fresh.gen.ts';
import twindConfig from '@/twind.config.ts';
import session from '@session';

await start(manifest as unknown as Manifest, { plugins: [twindPlugin(twindConfig), session()], port: PORT, hostname: BASE_HOST});
