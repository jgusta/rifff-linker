import { tw } from "https://esm.sh/v96/twind@0.16.17/twind";
import { BASE_URL, SITE_NAME, ENVIRONMENT } from "config";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { HandlerContext } from "$fresh/server.ts";
import { InputMeta, PageData, Rifff, RifffWad } from "types";
import Layout from "@components/Layout.tsx";
import { fetchRifff } from "@util/fetchRifff.ts";
import RifffCard from "@islands/RifffCard.tsx";
import {RifffContextProvider} from "@util/rifffContext.tsx"
import processRifffData from "@util/processRifffData.ts"

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const pattern = new URLPattern({ pathname: "/rifff/:id" });
    const rifff_id = pattern.exec(req.url)?.pathname.groups.id;

    if (rifff_id == undefined) {
      throw new Error('Bad rifff_id');
    }
    const rifff: Awaited<Promise<Rifff>> = await fetchRifff(rifff_id);
    const rifffWad = processRifffData(rifff);
    return  ctx.render(rifffWad);
  },
};

export default function RifffPage(props: PageProps) {
  const { meta, rifffData } = props.data;
  return (
    <Layout meta={meta}>
      <div class={tw`max-w-screen-lg`}>
        <div class={tw`flex flex-col`}>
          <div className="container">
            <div class={tw`text-lg px-2 py-2 text-white`}>{rifffData.title}</div>
          </div>
          <div class="container">
            <div class=""><img src={rifffData.display_image} /></div>
            {rifffData.title} by {rifffData.user} - {rifffData.description} - {rifffData.contributors}
            <RifffContextProvider rifffId={rifffData.rifff_id}>
              <RifffCard />
            </RifffContextProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
}
