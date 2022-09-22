import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme:{ 
    colors: {
      black: {
        100: "#d2d2d2",
        200: "#a5a5a6",
        300: "#787879",
        400: "#4b4b4d",
        500: "#1e1e20",
        600: "#18181a",
        700: "#121213",
        800: "#0c0c0d",
        900: "#060606"
},
      red: {
          100: "#fcd1dc",
          200: "#faa3b8",
          300: "#f77495",
          400: "#f54671",
          500: "#f2184e",
          600: "#c2133e",
          700: "#910e2f",
          800: "#610a1f",
          900: "#300510"
},
      
    }
  }
} as Options;
