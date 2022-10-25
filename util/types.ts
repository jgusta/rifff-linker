export interface RifffWad {
  meta: InputMeta, 
  rifffData: PageData,
  rifff: Rifff
}

// the data passed to the page's <head>
export interface PageMeta {
  canonical: string;
  description: string;
  display_image: string;
  img_alt: string;
  share_url: string;
  site_name: string;
  title: string;
}

export type InputMeta = Partial<PageMeta>;

// the data passed to the page's <body>
export interface PageData {
  title: string
  user: string
  rifff_title: string
  rifff_id: string
  display_image: string
  description: string
  byLine: string
  time: Date
  likes: number
  bpm: string
  bars: number
  signature:string
  seconds: number
}

// Shape of data sent from foreign API
export interface RifffResponse {
  data: Rifff[];
  meta: { version: number };
}

// The unwrapped Rifff
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

// Pieces of the Rifff

type Colour = string;

export interface RifffSnapshot {
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
  peaksData: number[];
}

export interface Loop {
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

export interface State {
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

export type CdnAttachment = {
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

