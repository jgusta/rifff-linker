import Layout from "@components/Layout.tsx"
import LoginPage from "@components/LoginPage.tsx";
import { startSession } from "@session"
import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    startSession(req);
    return await ctx.render();
  },
};
export default function Login() {
  const metaProps = {}
  return (

    <Layout meta={metaProps}>

      <LoginPage></LoginPage>

    </Layout>
  )
}
