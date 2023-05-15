import { useState } from "preact/hooks";
import { JSX } from 'preact/jsx-runtime';
import {
  buttonInput,
  cardInput,
  sm,
  css
} from 'styles';
interface Props {
  loggedIn: boolean;
  user?: string;
  loginEndpoint: string;
}

type LoginFormData = FormData & {
  username: string;
  password: string;
}

export default function LoginForm(props: Props): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(props.loggedIn)
  const [user, setUser] = useState(props.user)
  function processLogin(login: Response) {
    console.log('called', login);
  }
  function handleSubmit(evt: JSX.TargetedEvent<HTMLFormElement, Event>): false {
    evt.preventDefault();
    if (evt.target instanceof HTMLFormElement) {
      const body = (new FormData(evt.target) as LoginFormData);
      const result = fetch(`${props.loginEndpoint}`, {
        method: 'POST',
        body,
        redirect: 'manual'
      }).then(processLogin);
    }
    return false;
  }

  return (
    <>
      {loggedIn ?
        (<div>You are logged in as {user}</div>) :
        (<form encType="multipart/form-data" onSubmit={handleSubmit} class={css`
            margin-bottom: 1rem; 
            ${sm} {
                margin-bottom: 1.5rem;
            }
        `}>
          <img class={css`width:6rem;`} src="/images/EndlesssLogo.svg" alt="logo" />
          <div>
            <input type="text" name="username" id="username" class={cardInput} placeholder="Username" required={true} />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder="Password" class={cardInput} required={true} />
          </div>
          <button type="submit" class={buttonInput}>Sign in</button>
        </form>)
      }
    </>
  );
}
