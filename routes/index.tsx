import {
  BASE_URL,
  ENVIRONMENT,
  TEST_INPUT_LINK,
} from 'config';
import { tw } from 'twind';

import Layout from '@components/Layout.tsx';
import LinkConvertor from '@islands/LinkConvertor.tsx';

export default function Home() {
  const metaProps = {};
  if (TEST_INPUT_LINK && ENVIRONMENT === "development") {
    return (
      <>
        <Layout meta={metaProps}>
          <div class={tw`bg-gray-600 rounded-2xl shadow-2xl my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden`}>
            <LinkConvertor baseUrl={BASE_URL} startValue={TEST_INPUT_LINK}/>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Layout meta={metaProps}>
          <div class={tw`bg-gray-600 rounded my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden`}>
            <LinkConvertor baseUrl={BASE_URL} startValue="" />
          </div>
        </Layout>
      </>
    );
  }
}
