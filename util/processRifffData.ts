import { BASE_URL, SITE_NAME } from 'config';
import { PageData, Rifff, PageMeta, RifffWad } from "types";

export default function processRifffData(rifffWhole: Rifff): RifffWad {
  const rifff = rifffWhole;
  const display_image = rifff.image_url;
  const time = rifff.action_timestamp_iso;
  const user = rifff.user;
  const rifff_id = rifff._id;
  const otherContributors = rifff.creators.filter((x: string) => x != user);
  const isSenderInIt = otherContributors.length < rifff.creators.length;
  const feats = otherContributors.join(", ")
  const rifff_title = rifff.title;
  const title = `${user} - ${rifff.title}`;
  const share_url = `${BASE_URL}/rifff/${rifff_id}`;
  const baseBpm = (rifff.rifff.state.bps * 60);
  const canonical = share_url
  const bpm: string = (baseBpm.toFixed(5).toString().replace(/0*$/g, '').replace(/.$/g, '').replace(/\.$/g, ''))
  const description = isSenderInIt && otherContributors
    ? `feat ${feats} - Created @ ${time}`
    : `Created @ ${time}`;

  const byLine:string =( isSenderInIt ? `${user}${(feats.length?', ' + feats : '')}` : `${feats}`)

  const meta: Partial<PageMeta> = {
    description,
    canonical,
    site_name: SITE_NAME,
    display_image,
    share_url,
    title,
    img_alt: "Endlesss Rifff Viewer",
  }
  
  /**
   * Total time in seconds is (loops * beats per measure) / bps
   * length16ts/barlength = loops
   * time signature is (barLength / 4) / 4, beats per measure then is (barLength/4)
   * ((length16ts/barlength ) * (barLength / 4)) / bps
   * reduces to 0.25*(length16s/bps)
   * 
   * Thanks to feloniousmonk for the help!
   * */

  // map loops to length16th and bps
  const mapped = rifff.loops.map((i) => { return [i.length16ths, i.bps, i.barLength]});

  // find the longest loop, in length16ths
  const reduced = mapped.reduce((prev,curr) => prev[0] > curr[0] ? prev : curr, [0,0]);
  const [length16ths, bps, barLength] = reduced;
  const seconds = 0.25*(length16ths/bps)
  const numBeats = barLength / 4;

  const rifffData: PageData = {
    user,
    title: rifff_title,
    rifff_title,
    rifff_id,
    time,
    display_image,
    description,
    byLine,
    likes: rifff.react_counts.like,
    bpm,
    signature:`${numBeats} / 4`,
    bars: barLength,
    seconds: (seconds.toFixed(2).toString().replace(/0*$/g, '').replace(/.$/g, '').replace(/\.$/g,'')) as unknown as number
  }

  return { meta, rifffData, rifff }
}
