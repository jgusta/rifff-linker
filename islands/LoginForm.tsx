import { useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import {
  buttonInput,
  cardInput,
} from 'styles';
import { tw } from 'twind/css';
interface Props {
  loggedIn: boolean;
  user?: string;
}
export default function LoginForm(props: Props): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(props.loggedIn)
  const [user, setUser] = useState(props.user)

  async function handleSubmit(evt: JSX.TargetedEvent<HTMLFormElement, Event>) {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const result = await fetch('/api/auth', {
      method: 'POST',
      body: data,
    })
    console.log(result);
    // return result;
  }

  return (
    <>
      {loggedIn ?
        (<div>You are logged in as {user}</div>) :
        (<form onSubmit={handleSubmit} class={tw`space-y-4 md:space-y-6`}>
          <img class="w-24" src="/images/EndlesssLogo.svg" alt="logo" />
          <div>
            <input type="text" name="username" id="username" class={tw(cardInput)} placeholder="Username" required={true} />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder="Password" class={tw(cardInput)} required={true} />
          </div>
          <button type="submit" class={tw(buttonInput)}>Sign in</button>
        </form>)
      }
    </>
  );
}
