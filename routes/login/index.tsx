import {
  HandlerContext,
  Handlers,
} from '$fresh/server.ts';

import Layout from '@components/Layout.tsx';
import LoginPage from '@components/LoginPage.tsx';
import { startSession } from '@session';

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
      <LoginPage />
    </Layout>
  )
}
