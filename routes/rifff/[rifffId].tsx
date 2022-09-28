import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { BASE_URL } from "config";
import { Layout } from "../index.tsx";

export async function getRiffData(rifffId: string) {
  const resp = await fetch(
    "https://endlesss.fm/api/v3/feed/shared_rifff/" + rifffId,
  );
  const data = await resp.json();

  return data.data[0];
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const pattern = new URLPattern({ pathname: "/rifff/:id" });
    const rifffId = pattern.exec(req.url)?.pathname.groups.id;
    if (rifffId == undefined) {
      throw new Error();
    }
    const rifffData = await getRiffData(rifffId);
    console.log(rifffData);
    const resp = await ctx.render({ rifffData, rifffId });
    return resp;
  },
};

export default function RifffPage ({data}: PageProps) {
  const { rifffData, rifffId } = data;
  const shareImage = rifffData.image_url;
  const time = rifffData.action_timestamp_iso;
  const user = rifffData.user;
  const feats = rifffData.creators.filter((x: any) => x != user).join(", ");
  const title = `${user} - ${rifffData.title}`;
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
