import { env } from "config";

export declare interface PageMeta {
  canonical: string;
  description: string;
  display_image: string;
  img_alt: string;
  share_url: string;
  site_name: string;
  title: string;
  twitter_creator: string;
  user: string;
}

const metaDefaults: PageMeta = {
  description: "Create an easy-to-share link for your Endlesss rifffs",
  site_name: "Endlesss Riff Linker",
  twitter_creator: "",
  display_image: `${env.BASE_URL}/splat.png`,
  share_url: `${env.BASE_URL}`,
  title: "Endlesss Rifff Viewer",
  img_alt: "Endlesss Rifff Viewer",
  user: "",
  canonical: `${env.BASE_URL}`,
};

export function makeMeta(_meta: Partial<PageMeta>): PageMeta {
  return {...metaDefaults, ..._meta};
}

