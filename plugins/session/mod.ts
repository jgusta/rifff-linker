import { Plugin } from "$fresh/server.ts";
import getSession from "./Session.tsx";
import {
  setAuth,
  startSession,
  isLoggedIn,
  killCookies
} from "./SessionState.ts"


export * from "./types.ts";

export {
  startSession,
  setAuth,
  isLoggedIn,
  killCookies,
  getSession
} 

export default function session(): Plugin {
  return {
    name: "Session"
  }
}



