import { css, cx } from 'styles';
import { SITE_NAME } from 'config';
const flexCol = css`display: flex; flex-direction: col;`;
const outerCss = css`
  display: flex;
  align-items: center; 
  flex-wrap: wrap;
  padding: 0.25rem 1.0rem;
  width: 16rem; 
  max-width: 24rem;
`;
const logo = css({
  maxWidth: '40px',
  marginRight: '1em',
  height: 'auto'
});
const block = css`
  display: block;
`;

const titleCss = cx(css`
  color: white; 
  font-weight: bold;
`, block);

export default function LeftNav() {
  return (
    <div class={outerCss}>
      <a href="/" class={block}>
        <img src="/images/logo.svg" class={logo}></img>
      </a>
      <div class={flexCol}>
        <a href='/' class={titleCss}>{SITE_NAME}</a>
      </div>
    </div>
  )
}