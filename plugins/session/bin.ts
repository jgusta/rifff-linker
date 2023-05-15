import { generateSecretKey } from "./crypto.ts";

if (Deno.args[0] === "genkey" || Deno.args[0] === "gen-key") {
  const key = await generateSecretKey();
  console.log("Your key is:", key);
  console.log("Add this to your .env:", `SESSION_SECRET=${key}`);
} else {
  console.log("no command given.");
}
