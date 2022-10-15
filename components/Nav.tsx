import { apply, css, style, tw, StyleConfig } from "twind/style";
import {SITE_NAME} from "config";


export default function Nav({tClass}:{tClass:string}) {
  const logo = style({
    base: css({
      maxWidth: '40px',
      marginRight: '1em',
      height: 'auto'
    }),
  });

  const navClasses = tw`bg-gray-800 flex justify-between items-center flex-row py-10 px-4 h-16`

  return (
    <nav class={`${navClasses} ${tClass}`}>
      <div
        class={tw`container w-64 py-4 px-4 flex items-center flex-wrap max-w-screen-sm`}
      >
        <a href="/" class={tw`block`}><img src="/images/logo.svg" class={tw(logo())}></img></a><div class={tw`flex flex-col`}><a href='/' class={tw`block text-white font-bold`}>{SITE_NAME}</a></div>
      </div>
      <ul class={tw`container block py-6 px-4 text-sm w-64 text-right flex`}><li class={tw`inline-block text-right`}><a href="/" class={tw`text-gray-500 text-underline`}>Make new link</a></li></ul>
    </nav>
  );
}
