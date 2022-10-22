import { tw } from "twind";
import { AuthBucket, getSession } from "@session";
interface Props {
  auth: AuthBucket
}
export default function LoginPage(props:Props) {
  const sess = getSession()
  console.log('yes', auth)
 return( <div
    class={tw`bg-gray-600 my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden`}>

      {sess.isLoggedIn() ? (<div>Welcome {sess.user}!</div>):(<div>Please log in with your endlesss credentials in order to 'like' rifffs.</div>)}
      <form action="/api/auth" method="post">
        <label for="user">User</label>
        <input id="user" name="username" />
        <label for="pass">Pass</label>
        <input id="pass" name="password" />
        <input type="submit"></input>
      </form>
  </div>)
}