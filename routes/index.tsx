import {
  BASE_URL,
  ENVIRONMENT,
  TEST_INPUT_LINK,
} from 'config';
import { css } from 'fresh_emotion';
import Layout from '@components/Layout.tsx';
import LinkConvertor from '@islands/LinkConvertor.tsx';
const outerDiv = css`
  background-color: #4b5563;
  border-radius: 2rem;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: hidden;
`

export default function Home() {
  const metaProps = {};
  if (TEST_INPUT_LINK && ENVIRONMENT === "development") {
    return (
      <>
        <Layout meta={metaProps}>
          <div class={outerDiv}>
            <LinkConvertor baseUrl={BASE_URL} startValue={TEST_INPUT_LINK}/>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Layout meta={metaProps}>
          <div class={outerDiv}>
            <LinkConvertor baseUrl={BASE_URL} startValue="" />
          </div>
        </Layout>
      </>
    );
  }
}
