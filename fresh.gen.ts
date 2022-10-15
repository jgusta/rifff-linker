// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_middleware.tsx";
import * as $1 from "./routes/api/fakeRifff.tsx";
import * as $2 from "./routes/api/rifffData.ts";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/rifff/[rifffId].tsx";
import * as $$0 from "./islands/CopyButton.tsx";
import * as $$1 from "./islands/LinkConvertor.tsx";
import * as $$2 from "./islands/LinkHolder.tsx";
import * as $$3 from "./islands/RifffCard.tsx";

const manifest = {
  routes: {
    "./routes/_middleware.tsx": $0,
    "./routes/api/fakeRifff.tsx": $1,
    "./routes/api/rifffData.ts": $2,
    "./routes/index.tsx": $3,
    "./routes/rifff/[rifffId].tsx": $4,
  },
  islands: {
    "./islands/CopyButton.tsx": $$0,
    "./islands/LinkConvertor.tsx": $$1,
    "./islands/LinkHolder.tsx": $$2,
    "./islands/RifffCard.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
