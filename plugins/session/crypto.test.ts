import { decrypt, encrypt, generateSecretKey, getKey } from "./crypto.ts";
import { assertEquals, assertExists } from "./dev_deps.ts";

Deno.test("crytpographic functions", async () => {
  const key = await generateSecretKey();
  assertExists(key, "key generation failed");
  const myText =
    "Hello the world Hello the worldHello the worldHello the worldHello the worldHello the world Hello the worldHello the worldHello the world  Hello the worldHello the worldHello the world";
  const cryptoKey = await getKey(key);
  const cyphered = await encrypt(myText, cryptoKey);
  const decyphered = await decrypt(cyphered, cryptoKey);
  assertEquals(decyphered, myText);
});
