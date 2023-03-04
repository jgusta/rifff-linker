import { encrypt, decrypt, generateSecretKey, getKey } from "./crypto.ts";

if (Deno.args[0] === 'genkey' || Deno.args[0] === 'gen-key') {
  const key = await generateSecretKey();
  console.log('Your key is:', key)
  console.log('Add this to your .env:', `SESSION_SECRET=${key}`)
} else if (Deno.args[0] === 'test') {

  const myText = 'Hello the world Hello the worldHello the worldHello the worldHello the worldHello the world Hello the worldHello the worldHello the world  Hello the worldHello the worldHello the world';
  console.log(`Plaintext to start: ${myText}`);
  const key = await generateSecretKey();
  console.log(`Secret Key: ${key}`);
  const cryptoKey = await getKey(key);
  const cyphered = await encrypt(myText, cryptoKey)
  console.log(`Encrypted text: ${cyphered}`);
  
  const decyphered = await decrypt(cyphered, cryptoKey)
  console.log(`Plaintext decrypted: ${decyphered}`);
}
else {
  console.log('no command given.s')
}