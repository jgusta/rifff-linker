import { Layout } from "@components/Layout.tsx";


export default function Home() {
  const metaProps = {}
  return (
    <>
      <Layout meta={metaProps}>
        <div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
          <div class="sm:flex sm:items-center px-6 py-4">
            <img
              class="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
              src=""
              alt=""
            />
            <div class="text-center sm:text-left sm:flex-grow">
              <div class="mb-4">
                <p class="text-xl leading-tight">Riffffff</p>
                <p class="text-sm leading-tight text-gray-400">
                  <a href="http://localhost:8000/rifff/d9fbb3c02ca911edb3c0994264ac4392">CLick here</a>
                </p>
              </div>
              <div>
                <button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border-2 border-purple-400 text-purple-500 hover:bg-purple-600 hover:text-white">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
