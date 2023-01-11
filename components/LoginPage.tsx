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
import LoginForm from "@islands/LoginForm.tsx";
import CardH1 from "@components/layout/CardH1.tsx";
import CardH2 from "@components/layout/CardH2.tsx";

export default function LoginPage(): JSX.Element {
  const sess = getSession();
  console.log('session:', sess);
  const loggedIn = sess.isLoggedIn();
  return (<CenteredLayout>
    <HeadingImage src="/images/logo.svg" alt="Logo" />
    <Card>
      <CardH1>Enter your Endlesss credentials</CardH1>
      <CardH2>This will allow {SITE_NAME} to:</CardH2>
      <ul class={tw`mt-0 mb-0`}>
        <li class={tw(liststyle)}>- See your basic account info</li>
        <li class={tw(liststyle)}>- View your shared rifffs </li>
        <li class={tw(liststyle)}>- Favorite rifffs on your behalf</li>
      </ul>
      <div class={tw(labelstyle)}>NOTICE! {SITE_NAME} is not affiliated with or endorsed by Endlesss Limited.</div>
      <LoginForm loggedIn={loggedIn}/>
    </Card>
  </CenteredLayout>);
}

