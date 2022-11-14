import { resolve } from '$std/path/mod.ts';

try {
  
  const { files } = await Deno.emit("dev.ts",{
    importMap: resolve('./import.json'),
    declaration: true
  });
  for await (const [fileName, text] of Object.entries(files) as [string, string][]) {
    console.log(`emitted ${fileName} with a length of ${text.length}`);
  }
} catch (e) {
  // something went wrong, inspect `e` to determine
  console.log(e)
}