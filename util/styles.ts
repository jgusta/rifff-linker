import { apply } from 'twind';
import { css } from 'twind/css';

export const cardOuter = apply`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`;

export const cardInput = apply`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

export const buttonInput = apply`w-full text-white bg-primary-300 border border-white hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`;

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
