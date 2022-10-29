import { serve } from "https://deno.land/std@0.161.0/http/server.ts";




const respJson = async function(filename) {
  const text = await Deno.readTextFile(filename);
  const jobj: unknown = JSON.parse(text);
  return jobj;
}


function handler(req:Request):Response {
  
}