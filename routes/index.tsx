import { Layout } from "@components/Layout.tsx";
import LinkConvertor from "@islands/LinkConvertor.tsx";
import { BASE_URL } from "config";

export default function Home() {
  const metaProps = {};
  return (
    <>
      <Layout meta={metaProps}>
        <div class="bg-gray-600 my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden">
          <LinkConvertor baseUrl={BASE_URL}></LinkConvertor>
        </div>
      </Layout>
    </>
  );
}
