import Layout from "@components/Layout.tsx"
import { tw } from "twind"
import LoginPage from "@components/LoginPage.tsx";
import { getSession, startSession } from "@session"
import { Handlers, HandlerContext,PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    await startSession(req);
    return await ctx.render();
  },
};
export default function Login() {
  const sess = getSession();

  const metaProps = {}
  return (
    <>
      <Layout meta={metaProps}>
        
          <LoginPage />
        
      </Layout>
    </>
  )
}
