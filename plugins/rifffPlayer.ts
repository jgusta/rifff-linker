import { Plugin, PluginRenderResult } from "$fresh/server.ts";

// deno-lint-ignore no-cond-assign no-constant-condition
let once = function <T>(x: T): T | void { return (once = (_) => { }) ? x : x };

export default function rifffPlayer(): Plugin {
  const main = `data:application/javascript,import initPlayer from "${new URL("./rifffPlayer/main.ts", import.meta.url).href}";
  export default function(state) { initPlayer(state); };`;
  return {
    name: "rifffPlayer",
    entrypoints: { "main": main },
    render(ctx): PluginRenderResult {
      ctx.render();
      return once({
        scripts: [{
          entrypoint: "main",
          state: {}
        }]
      }) || ({ scripts: [] });
    }
  }
}