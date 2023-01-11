import { apply } from 'twind';
import { css } from 'twind/css';

export const cardOuter = apply`w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700`;

export const cardInput = apply`border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 dborder-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`;

export const buttonInput = apply`w-full text-white border border-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`;

export const labelstyle = css({
  color: "white",
  // padding: "0.5em",
  // marginTop: "0.5em"
  paddingLeft: "0.5em",
  paddingRight: "0.5em",
});

export const liststyle = css({
  color: "white",
  fontSize: "0.9em",

  lineHeight: "1.4em",
  paddingLeft: "20px",
  // marginTop: "0.5em"
})
