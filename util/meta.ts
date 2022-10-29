import { env } from "config";
import { PageMeta } from "types";

export const metaDefaults: PageMeta = {
  description: "Create an easy-to-share link for your Endlesss rifffs",
  site_name: "Endlesss Riff Linker",
  display_image: `${env.BASE_URL}/splat.png`,
  share_url: `${env.BASE_URL}`,
  title: "Endlesss Rifff Viewer",
  img_alt: "Endlesss Rifff Viewer",
  canonical: `${env.BASE_URL}`,
};

export function makeMeta(_meta: Partial<PageMeta>): PageMeta {
  return { ...metaDefaults, ..._meta };
}

