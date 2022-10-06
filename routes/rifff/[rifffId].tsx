import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { BASE_URL, FROM, REFERER, SITE_NAME } from "config";
import { Layout } from "@components/Layout.tsx";
import { getRifffData, Rifff } from "@api/rifffData.ts";
import RifffDisplay from "../../components/RifffDisplay.tsx";

//endlesss.fm/jams/10709ed65be48dcc8381cf6022b25f3c34676689e013e9f7b6f55ecd9855d241?rifffId=cd5a89f03ebc11ed89f007f1ba9c2466

export const handler: Handlers = {
  async GET(req, ctx) {
    const pattern = new URLPattern({ pathname: "/rifff/:id" });
    const rifff_id = pattern.exec(req.url)?.pathname.groups.id;
    if (rifff_id == undefined) {
      throw new Error('Bad rifff_id');
    }
    const rifff: Rifff = await getRifffData(rifff_id);
    console.log(rifff);
    await Deno.writeTextFile("./hello.txt", JSON.stringify(rifff));
    return await ctx.render(rifff);
  },
};

export default function RifffPage(data: { data: Rifff } & PageProps) {
  const rifff: Rifff = data.data;
  const display_image = rifff.image_url;
  const time = rifff.action_timestamp_iso;
  const user = rifff.user;
  const rifff_id = rifff._id;
  const otherContributors = rifff.creators.filter((x: string) => x != user);
  const isSenderInIt = otherContributors.length < rifff.creators.length;
  const feats = otherContributors.join(", ")
  const rifff_title = rifff.title;
  const contributors = rifff.creators;
  const title = `${user} - ${rifff.title}`;
  const share_url = `${BASE_URL}/rifff/${rifff_id}`;
  const forward_url =
    `https://endlesss.fm/rifff-link?type=shared&rifffId=${rifff_id}`;
  const description = isSenderInIt && otherContributors
    ? `feat ${feats} - Created @ ${time}`
    : `Created @ ${time}`;
  const meta = {
    description,
    contributors,
    site_name: SITE_NAME,
    display_image,
    share_url,
    title,
    rifff_title,
    img_alt: "Endlesss Rifff Viewer",
    user
  };
  const baseBpm = (rifff.rifff.state.bps * 60);
  const bpm:string = (baseBpm.toFixed(5).toString().replace(/0*$/g, '').replace(/.$/g,''))
  const rifffData = {
    user,
    title:rifff_title,
    rifff_id,
    display_image,
    description,
    contributors,
    likes:rifff.react_counts,
    bpm,
    bars:rifff.rifff.state.barLength,
    seconds: rifff.rifff.state.bps * 4 
  }
  console.log(meta);
  return (
    <Layout meta={meta}>
      <RifffDisplay rifffData={rifffData}> </RifffDisplay>
    </Layout>
  );
}
