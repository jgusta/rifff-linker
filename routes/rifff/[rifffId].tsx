import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { BASE_URL, FROM, REFERER } from "config";
import { Layout } from "@components/Layout.tsx";
import { getRifffData, Rifff } from "@api/rifffData.ts";

//endlesss.fm/jams/10709ed65be48dcc8381cf6022b25f3c34676689e013e9f7b6f55ecd9855d241?rifffId=cd5a89f03ebc11ed89f007f1ba9c2466

export const handler: Handlers = {
  async GET(req, ctx) {
    const pattern = new URLPattern({ pathname: "/rifff/:id" });
    const rifffId = pattern.exec(req.url)?.pathname.groups.id;
    if (rifffId == undefined) {
      throw new Error();
    }
    const rifff: Rifff = await getRifffData(rifffId);
    console.log(rifff);
    await Deno.writeTextFile("./hello.txt", JSON.stringify(rifff));
    return await ctx.render(rifff);
  },
};

export default function RifffPage(data: { data: Rifff } & PageProps) {
  const rifff = data.data;
  const shareImage = rifff.image ? rifff.image_url : "";
  const time = rifff.action_timestamp_iso;
  const user = rifff.user;
  const rifffId = rifff._id;
  const feats = rifff.creators.filter((x: string) => x != user).join(", ");
  const title = `${user} - ${rifff.title}`;
  const shareUrl = `${BASE_URL}/rifff/${rifffId}`;
  const forwardUrl =
    `https://endlesss.fm/rifff-link?type=shared&rifffId=${rifffId}`;
  const desc = feats.length
    ? `feat ${feats} - Created @ ${time}`
    : `Created @ ${time}`;
  const meta = {
    description: desc,
    site_name: "Endlesss Riff Linker",
    display_image: shareImage,
    share_url: shareUrl,
    title,
    img_alt: "Endlesss Rifff Viewer",
    user,
  };
  console.log(meta);
  return (
    <Layout meta={meta}>
      <>
        {title} by {user} - {desc} - {forwardUrl}
      </>
    </Layout>
  );
}
