import { FROM, REFERER } from "../../util/config.ts";
export interface RifffResponse {
  data: Rifff[];
  meta: { version: number };
}

type Colour = string;

export interface Rifff {
  _id: string;
  _rev: string;
  doc_id: string;
  user: string;
  band: string;
  database_id: string;
  type: string;
  action_timestamp: number;
  action_timestamp_iso: Date;
  title: string;
  private: boolean;
  creators: string[];
  tags: string[];
  react_counts: {
    like: number;
  };
  rifff: RifffSnapshot;
  loops: Loop[];
  cdn_attachments: CdnAttachment
  image_url: string;
  image: boolean;
  liked_by_current_user: boolean;
}

interface RifffSnapshot {
  _id: string;
  _rev: string;
  state: State;
  scale: number;
  app_version: number;
  type: string;
  sentBy: string;
  userName: string;
  colour: Colour;
  layerColours: Colour[];
  magnitude: number;
  created: number;
  root: number;
  brightness: number;
  peakRifffDatum: number[];
}

interface Loop {
  _id: string;
  _rev: string;
  cdn_attachments: CdnAttachment
  isNote: boolean;
  primaryColour: Colour;
  bps: number;
  app_version: number;
  isMic: boolean;
  colourHistory: Colour[];
  isDrum: boolean;
  length16ths: number;
  originalPitch: number;
  creatorUserName: string;
  type: string;
  length: number;
  presetName: string;
  isBass: boolean;
  sampleRate: number;
  barLength: number;
  created: number;
}

interface State {
  bps: number;
  playback: {
    effects: {
      slots: {
        current: null;
        type: "DSP";
      }[];
      type: "DSP";
    };
    type: "DSP";
    slot: {
      current: {
        on: boolean;
        type: string;
        currentLoop: string;
        gain: number;
      };
      type: "DSP";
    };
  }[];
  type: "DSP";
  barLength: number;
}

type CdnAttachment = {
  oggAudio: {
    endpoint: string;
    hash: string;
    key: string;
    length: number;
    mime: string;
    url: string;
  };
} | {
  avatars: {
    endpoint: string;
    bucket: string;
    hash: string;
    key: string;
    length: number;
    mime: string;
    url: string;
  }
}

export async function getRifffData(rifffId: string): Promise<Rifff> {
  const resp = await fetch(
    "https://endlesss.fm/api/v3/feed/shared_rifff/" + rifffId,
    {
      headers: new Headers({
        "User-Agent": "Endlesss Rifff Linker/1.0 DenoDeploy",
        "From": FROM,
        "Referer": REFERER
      })
    });
  const result = await resp.json();
  const rifff = result.data[0];
  return rifff;
}
