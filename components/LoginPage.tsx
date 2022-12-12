import { SITE_NAME } from 'config';
import { JSX } from 'preact/jsx-runtime';
import {
  buttonInput,
  cardInput,
  labelstyle,
  liststyle,
} from 'styles';
import { tw } from 'twind/css';

import Card from '@components/layout/Card.tsx';
import CenteredLayout from '@components/layout/CenteredLayout.tsx';
import HeadingImage from '@components/layout/HeadingImage.tsx';
import { getSession } from '@session';

export default function LoginPage(): JSX.Element {
  const sess = getSession();
  console.log('yes', sess);
  return (<CenteredLayout>
    <HeadingImage src="/images/logo.svg" alt="Logo" />
    <Card>
      <h1 class={tw`text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`}>
        Enter your Endlesss credentials
      </h1>
      <div class={tw`text-gray-900 md:text-sm dark:text-white`}>
        This will allow {SITE_NAME} to:
      </div>
      <ul class={tw`mt-0 mb-0`}>
        <li class={tw(liststyle)}>- See your basic account info</li>
        <li class={tw(liststyle)}>- View your shared rifffs </li>
        <li class={tw(liststyle)}>- Favorite rifffs on your behalf</li>
      </ul>
      <div class={tw(labelstyle)}>NOTICE! {SITE_NAME} is not affiliated with or endorsed by Endlesss Limited.</div>
      <form action="/api/auth" method="post" class={tw`space-y-4 md:space-y-6`}>
        <img class="w-24" src="/images/EndlesssLogo.svg" alt="logo" />
        <div>
          <input type="text" name="username" id="username" class={tw(cardInput)} placeholder="Username" required={true} />
        </div>
        <div>
          <input type="password" name="password" id="password" placeholder="Password" class={tw(cardInput)} required={true} />
        </div>
        <button type="submit" class={tw(buttonInput)}>Sign in</button>
      </form>
    </Card>
  </CenteredLayout>);
}