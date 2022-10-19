import Layout from "@components/Layout.tsx"
import LinkConvertor from "@islands/LinkConvertor.tsx"
import { BASE_URL, ENVIRONMENT, LOGIN_ENDPOINT, SESSION_ENDPOINT } from "config"
import { tw } from "twind"
import {
  deleteCookie,
  setCookie,
  getCookies,
} from "$std/http/cookie.ts"

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const cookies = getCookies(req)
    res = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "User-Agent": "Endlesss/3357 CFNetwork/1220.1 Darwin/20.3.0",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: "username=slowgaffle&password=%2A%2A%2A%2A%2A+Hidden+credentials+%2A%2A%2A%2A%2A",
    })
      .then((res) => res.text())
      .then(console.log.bind(console))
      .catch(console.error.bind(console))
    return ctx.render({ results, query })
  },
}


export default function Home() {
  const metaProps = {}
    return (
      <>
        <Layout meta={metaProps}>
          <div
            class={tw`bg-gray-600 my-10 px-8 py-4 mx-auto max-w-lg shadow-lg overflow-hidden`}>
            <form>

            </form>
          </div>
        </Layout>
      </>
    )
  
}
