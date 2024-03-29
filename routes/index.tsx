import  Layout  from "@components/Layout.tsx";
import LinkConvertor from "@islands/LinkConvertor.tsx";
import { BASE_URL, ENVIRONMENT, TEST_INPUT_LINK } from "config";
import {tw} from 'twind'
import MediumButton from "@islands/MediumButton.tsx";
export default function Home() {
  const metaProps = {};
  if (TEST_INPUT_LINK && ENVIRONMENT === "development") {
    return (
      <>
        <Layout meta={metaProps}>
          <div class={tw`shadow bg-gray-600 my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden`}>
            <LinkConvertor baseUrl={BASE_URL} startValue={TEST_INPUT_LINK}/>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Layout meta={metaProps}>
          <>
            <div
              class={tw`bg-gray-600 my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden`}>
              <LinkConvertor baseUrl={BASE_URL} startValue="" />
            </div>
            <div class={tw`w-[200px] m-auto flex flex-col px-8 relative`}>
              <MediumButton href={`/random`}>Random Rifff!</MediumButton>
            </div>
          </>
        </Layout>
      </>
    )
  }
}
