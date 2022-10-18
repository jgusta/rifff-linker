import { BASE_URL, SITE_NAME } from 'config';
import { PageData, Rifff, PageMeta, RifffWad } from "types";

export default function processRifffData(rifffWhole: Rifff): RifffWad {
  console.log('processrifffdata')
  const rifff = rifffWhole;
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
  const baseBpm = (rifff.rifff.state.bps * 60);
  const canonical = share_url
  const bpm: string = (baseBpm.toFixed(5).toString().replace(/0*$/g, '').replace(/.$/g, ''))
  const description = isSenderInIt && otherContributors
    ? `feat ${feats} - Created @ ${time}`
    : `Created @ ${time}`;


  const meta: Partial<PageMeta> = {
    description,
    canonical,
    site_name: SITE_NAME,
    display_image,
    share_url,
    title,
    img_alt: "Endlesss Rifff Viewer",
  }

  const rifffData: PageData = {
    user,
    title: rifff_title,
    rifff_title,
    rifff_id,
    display_image,
    description,
    contributors,
    likes: rifff.react_counts.like,
    bpm,
    bars: rifff.rifff.state.barLength,
    seconds: rifff.rifff.state.bps * 4
  }

  return { meta, rifffData,  rifff }
}