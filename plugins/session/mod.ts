import { Plugin } from "$fresh/server.ts";
export * from "./types.ts";
export default function session(): Plugin {
  return {
    name: "Session"
  }
}



