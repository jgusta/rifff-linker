import { tw } from 'twind';

import {
  AuthBucket,
  getSession,
} from '@session';

interface Props {
  auth?: AuthBucket
}
export default function LoginPage(props: Props) {
  const sess = getSession();
  console.log('yes', sess);

  return (<div class={tw`bg-gray-600 mt-20 px-8 py-10 mb-40 mx-auto max-w-xl shadow-lg overflow-hidden`}>
    <div class={tw`text-white mt-2 mb-4`}>

      {sess.isLoggedIn() ? `Welcome ${sess.getName()}!` : `Please log in with your endlesss credentials in order to 'like' Rifffs`}
    </div>
    <form action="/api/auth" method="post">
      <div><label for="user">User</label>
      <input id="user" name="username" /></div>
     <div class={tw``}> <label for="pass">Pass</label>
      <input id="pass" type="" name="password" /></div>
      <div><input type="submit"></input></div>
    </form>
  </div>)
}