import { USER_AGENT } from 'config';
import { LOGIN_ENDPOINT } from 'config';

function isString(i: FormDataEntryValue | null): i is string {
  return (typeof i === 'string');
}

export const loginEndlesss = async (username: string, password: string) => {
  if (!isString(password) || !isString(username)) {
    throw new Error('Bad login')
  }

  const body = new URLSearchParams({ username, password });

  const incomingRemoteRes = await fetch(LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body,
  })
  const incomingRemoteJson = await incomingRemoteRes.json()

  return incomingRemoteJson;
}
