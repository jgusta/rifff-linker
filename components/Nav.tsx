import { SITE_NAME } from 'config';
import {
  css, cx, sm
} from 'styles';

export default function Nav({ tClass }: { tClass: string }) {
  const logo = css({
    maxWidth: '40px',
    marginRight: '1em',
    height: 'auto'
  });
  const linkText = css`
    color:#D1D5DB;
    &hover{text-decoration: text-underline;}
    `;
  const flex = css`display: flex;`
  const block = css`display: block;`
  const flexCol = css`display: flex; flex-direction: col;`
  const flexRow = css`display: flex; flex-direction: row;`
  const spread = css`justify-content: space-between;align-items: center;`
  const bgGray800 = css`background-color: #1f2937;`
  const whiteBold = css`color: white; font-weight: bold;`
  const rTextSm = css`${sm} {font-size: 0.875rem;}`
  const navClasses = cx(bgGray800, flexRow, spread)
  const pad1_4 = css`padding: 0.25rem 1.0rem;`
  const flexCenterWrap = css`display: flex; align-items: center; flex-wrap: wrap;`
  const width16_24 = css`width: 16rem; max-width: 24rem;`
  const blockR4 = css`display: block; margin-right: 1rem;`
  return (
    <nav class={cx(navClasses, tClass)}>
      <div class={cx(pad1_4, flexCenterWrap, width16_24)}>
        <a href="/" class={block}>
          <img src="/images/logo.svg" class={logo}></img>
        </a>
        <div class={flexCol}>
          <a href='/' class={cx(whiteBold, block)}>{SITE_NAME}</a>
        </div>
      </div>
      <ul class={cx(pad1_4, flex, rTextSm)}>
        <li class={blockR4}>
          <a href="/" class={linkText}>Make new link</a>
        </li>
        <li class={blockR4}>
          <a href="/login" class={linkText}>Login</a>
    <nav class={`${navClasses} ${tClass}`}>
      <div
        class={tw`w-64 py-1 px-4 flex items-center flex-wrap max-w-screen-sm`}>
        <a href="/" class={tw`block`}>
          <img src="/images/logo.svg" class={tw(logo())}></img>
        </a>
        <div class={tw`flex flex-col`}>
          <a href="/" class={tw`block text-white font-bold`}>
            {SITE_NAME}
          </a>
        </div>
      </div>
      <ul class={tw`block py-1 px-4 text-sm text-right`}>
        <li class={tw`inline-block mx-2 text-right`}>
          <a href="/random" class={tw`text-gray-300 text-underline`}>
            Random top rifff!
          </a>
        </li>
        <li class={tw`inline-block mx-2 text-right`}>
          <a href="/" class={tw`text-gray-300 text-underline`}>
            Make new link
          </a>
        </li>
      </ul>
    </nav>
  )
}
