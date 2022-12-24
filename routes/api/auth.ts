import { Handlers } from "$fresh/server.ts";
import { getResponse, setAuth } from "@session";
import { loginEndlesss } from '@api/loginEndlesss.ts';

export const handler: Handlers = {
  async POST(incomingLocalReq) {
    const incomingLocalFormdata = await incomingLocalReq.formData()
    const inUser = incomingLocalFormdata.get('username') as string
    const inPass = incomingLocalFormdata.get('password') as string

    const incomingRemoteJson = await loginEndlesss(inUser, inPass);

    setAuth(incomingRemoteJson);
    const { user_id } = incomingRemoteJson

    const outgoingLocalBody = {
      status: 'success',
      user_id
    }

    const out = JSON.stringify(outgoingLocalBody);
    const res = getResponse(out, 'json');
    console.log(out)
    return res;
  }
}