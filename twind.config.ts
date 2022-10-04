import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', 'sans-serif'],
        'display': ['aino bold', 'sans-serif']
      }
    }
  }
} as Options;
