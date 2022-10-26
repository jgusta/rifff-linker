import { Plugin } from "$fresh/server.ts";

import {
  setAuth,
  startSession,
  isLoggedIn
} from "@/plugins/session/SessionState.ts"

export * from "@/plugins/session/types.ts";

import getSession 

export {
  startSession,
  setAuth,
  isLoggedIn,
  getSession
}

export default function session(): Plugin {
  return {
    name: "session",
    render: (ctx) => {
      ctx.render();
      return {};
    }

  }
}



