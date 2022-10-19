import { tw } from "twind";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { HandlerContext } from "$fresh/server.ts";
import { Rifff, RifffWad } from "types";
import Layout from "@components/Layout.tsx";
import { fetchRifff } from "@util/fetchRifff.ts";
import processRifffData from "@util/processRifffData.ts"
import RifffCard from "@islands/RifffCard.tsx";
import StatBlock from "@components/StatBlock.tsx";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const pattern = new URLPattern({ pathname: "/rifff/:id" });
    const rifff_id = pattern.exec(req.url)?.pathname.groups.id;

    if (rifff_id == undefined) {
      throw new Error('Bad rifff_id');
    }
    const rifff: Awaited<Promise<Rifff>> = await fetchRifff(rifff_id);
    const rifffWad = processRifffData(rifff);
    return ctx.render(rifffWad);
  },
};

export default function RifffPage(props: PageProps<RifffWad>) {
  const { meta, rifffData, rifff } = props.data;

  const stats = [
    ['Posted by', rifffData.user],
    ['Music by', rifffData.byLine],
    ['Date', rifffData.time],
    ['BPM', rifffData.bpm],
    ['Length', `${rifffData.seconds} seconds`],
    ['Bars', rifffData.bars],
    ['Likes', rifffData.likes]
  ]

  return (
    <Layout meta={meta}>
      <div class={tw`w-full`}>
        <h1 class={tw`max-w-lg m-auto flex flex-col px-8 text-3xl py-2 text-white text-center`}>{rifffData.title}</h1>
        <div class={tw`max-w-md m-auto flex flex-col px-8`}>
          <RifffCard rifff={rifff} background={rifffData.display_image}/>
          <StatBlock stats={stats}/>
        </div>
      </div>

    </Layout>
  );
}
