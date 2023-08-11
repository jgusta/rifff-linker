import {
  css, cx, sm
} from 'styles';

const rightNavCss = css`
  padding: 0.25rem 1.0rem;
  display: flex;
  ${sm} {font-size: 0.875rem;}
`;

const blockR4 = css`
  display: block; margin-right: 1rem;
`;

const linkText = css`
    color:#D1D5DB;
    &hover{text-decoration: text-underline;}
`;

type Props = {
  link1href: string
  link1text: string
  link2href: string
  link2text: string
}

export default function RightNav(props:Props) {
  return (
    <ul class={rightNavCss}>
      <li class={blockR4}>
        <a href="/" class={linkText}>Make new link</a>
      </li>
      <li class={blockR4}>
        <a href="/login" class={linkText}>Login</a>
      </li>
    </ul>
  );
}
