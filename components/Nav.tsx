import { SITE_NAME } from 'config';
import {
  css,
  style,
  tw,
} from 'twind/style';

export default function Nav({ tClass }: { tClass: string }) {
  const logo = style({
    base: css({
      maxWidth: '40px',
      marginRight: '1em',
      height: 'auto'
    }),
  });

  const navClasses = tw`bg-gray-800 flex justify-between items-center flex-row `

  return (
    <nav class={`${navClasses} ${tClass}`}>
      <div
        class={tw`w-64 py-1 px-4 flex items-center flex-wrap max-w-screen-sm`}
      >
        <a href="/" class={tw`block`}><img src="/images/logo.svg" class={tw(logo())}></img></a><div class={tw`flex flex-col`}><a href='/' class={tw`block text-white font-bold`}>{SITE_NAME}</a></div>
      </div>
      <ul class={tw`py-1 px-4 text-sm flex`}>
        <li class={tw`block mr-4`}><a href="/" class={tw`text-gray-300 hover:text-underline`}>Make new link</a>
        </li>
        <li class={tw`block mr-4`}><a href="/login" class={tw`text-gray-300 hover:text-underline`}>Login</a></li>
        
        </ul>
    </nav>
  );
}
