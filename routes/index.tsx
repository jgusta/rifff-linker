import { Layout } from "@components/Layout.tsx";
import LinkConvertor from "@islands/LinkConvertor.tsx";
import { BASE_URL } from "../util/config.ts";


export default function Home() {
  const metaProps = {}
  return (
    <>
      <Layout meta={metaProps}>
        <div class="bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden">
          <div class="sm:flex sm:items-center px-6 py-4">
    <div>
        <LinkConvertor baseUrl={BASE_URL}></LinkConvertor>
    </div>

          </div>
        </div>
      </Layout>
    </>
  );
}
