import { Options } from '$fresh/plugins/twind.ts';
import {
  apply,
  css,
} from 'twind/css';

export default {
  selfURL: import.meta.url,
  preflight: {
    body: apply(css({
      backgroundColor: "rgb(31,41,55)"
    })),
    '@font-face': [
      {
        fontFamily: "Aino",
        fontWeight: 400,
        src: 'url(/fonts/aino-regular.woff) format("woff")'
      },
      {
        fontFamily: "Aino Bold",
        fontWeight: 700,
        src: 'url(/fonts/aino-bold.woff) format("woff")'
      },
      {
        fontFamily: "Aino Headline",
        fontWeight: 400,
        src: 'url(/fonts/aino-headline.woff) format("woff")'
      }
    ]
  },
  theme: {
    fontFamily: {
      'sans': ['Aino', 'sans-serif'],
      'display': ['Aino Bold', 'sans-serif']
    }
  }
} as Options;
