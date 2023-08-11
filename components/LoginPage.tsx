import { SITE_NAME } from 'config';
import { LOGIN_ENDPOINT } from 'config';
import { JSX } from 'preact/jsx-runtime';
import {
  css,
  labelstyle,
  liststyle,
} from 'styles';
import Card from '@components/layout/Card.tsx';
import CenteredLayout from '@components/layout/CenteredLayout.tsx';
import HeadingImage from '@components/layout/HeadingImage.tsx';
import { getSession } from '@session';
import LoginForm from "@islands/LoginForm.tsx";
import CardH1 from "@components/layout/CardH1.tsx";
import CardH2 from "@components/layout/CardH2.tsx";
import FeatureList from './layout/FeatureList.tsx';
import FeatureListItem from './layout/FeatureListItem.tsx';

export default function LoginPage(): JSX.Element {
  const sess = getSession();
  const loggedIn = sess.isLoggedIn();
  const user = sess.getName();
  return (
    <CenteredLayout>
    <HeadingImage src="/images/logo.svg" alt="Logo" />
    <Card>
      <CardH1>Enter your Endlesss credentials</CardH1>
      <CardH2>This will allow {SITE_NAME} to:</CardH2>
      <FeatureList>
        <FeatureListItem>
            - See your basic account info
        </FeatureListItem>
          <FeatureListItem>
            - View your shared rifffs
          </FeatureListItem>
          <FeatureListItem>
            - Favorite rifffs on your behalf
          </FeatureListItem>
      </FeatureList>
      <div class={labelstyle}>NOTICE! {SITE_NAME} is not affiliated with or endorsed by Endlesss Limited.</div>
      <LoginForm loggedIn={loggedIn} user={user} loginEndpoint='/api/auth'/>
    </Card>
  </CenteredLayout>);
}

