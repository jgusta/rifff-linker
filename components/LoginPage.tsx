import { SITE_NAME } from 'config';
import {
  css,
  tw,
} from 'twind/css';

import {
  AuthBucket,
  getSession,
} from '@session';

interface Props {
  auth?: AuthBucket
}
export default function LoginPage(props: Props) {
  const sess = getSession();
  console.log('yes', sess);

  const inputstyle = css({
    height: "20px",
    color: "black",
    padding: "0.5em",
    marginTop: "0.5em"
  });

  const buttonstyle = css({
    width: "100%",
    padding: "0.5em",
    marginTop: "0.5em"

  })

  const labelstyle = css({
    color: "white",
    // padding: "0.5em",
    // marginTop: "0.5em"
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  });

  const liststyle = css({
    color: "white",
    fontSize: "0.9em",
 
    lineHeight: "1.4em",
    paddingLeft: "20px",
    // marginTop: "0.5em"
  })

  return (
    <><section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-32 mr-2" src="/images/logo.svg" alt="logo" />
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="space-y-4 md:space-y-6 sm:p-8">
            <h1 class={tw`text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`}>
              Enter your Endlesss credentials
            </h1>

            <div class={tw`text-gray-900 md:text-sm dark:text-white`}>
              This will allow {SITE_NAME} to:
            </div> 
            <ul class={tw`mt-0 mb-0`}>
              <li class={tw(liststyle)}>- See your basic account info</li>
              <li class={tw(liststyle)}>- View your shared rifffs </li>
              <li class={tw(liststyle)}>- Favorite rifffs on your behalf</li>
            </ul> 
            <div class={tw(labelstyle)}>NOTICE! {SITE_NAME} is not affiliated with or endorsed by Endlesss Limited.</div>
            <form action="/api/auth" method="post" class="space-y-4 md:space-y-6">
              <img class="w-24" src="/images/EndlesssLogo.svg" alt="logo" />
              <div>

                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
              </div>
              <div>
                <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              <button type="submit" class="w-full text-white bg-primary-300 border border-white hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section></>
  )
}