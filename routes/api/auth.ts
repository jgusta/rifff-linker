import { USER_AGENT } from 'config';
import { LOGIN_ENDPOINT } from 'config';
import { Handlers } from "$fresh/server.ts";
import { getResponse, LoginResponse, setAuth, startSession } from "@session";

interface Data {
  results: string[];
  query: string;
}

function isString(i: FormDataEntryValue | null): i is string {
  if (typeof i === 'string') {
    return true;
  }
  return false;
}

export const handler: Handlers<Data> = {
  async POST(incomingLocalReq) {
    await startSession(incomingLocalReq)
    const incomingLocalFormdata = await incomingLocalReq.formData()

    const inUser = incomingLocalFormdata.get('username')
    const inPass = incomingLocalFormdata.get('password')

    const outgoingRemoteBody = new URLSearchParams()

    if (isString(inPass) && isString(inUser)) {
      outgoingRemoteBody.set('password', inPass)
      outgoingRemoteBody.set('username', inUser)
    } else {
      throw new Error('Bad login')
    }

    const incomingRemoteRes: LoginResponse = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "User-Agent": USER_AGENT,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: outgoingRemoteBody,
    })

    const incomingRemoteJson = await incomingRemoteRes.json()
    const { user_id } = incomingRemoteJson

    setAuth(incomingRemoteJson);

    const outgoingLocalBody = {
      status: 'success',
      user_id
    }

    const out = JSON.stringify(outgoingLocalBody);
    const res = getResponse(out);

    return res;
  }
}