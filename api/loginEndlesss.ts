import { USER_AGENT } from 'config';
import { LOGIN_ENDPOINT } from 'config';
import { LoginResponse } from "@/plugins/session/types.ts";


function isString(i: FormDataEntryValue | null): i is string {
  return (typeof i === 'string');
}

export const loginEndlesss = async (inUser: string, inPass: string) => {
  const outgoingRemoteBody = new FormData()

  if (isString(inPass) && isString(inUser)) {
    outgoingRemoteBody.append('password', inPass)
    outgoingRemoteBody.append('username', inUser)
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
  console.log(incomingRemoteJson)

  return incomingRemoteJson;
}
