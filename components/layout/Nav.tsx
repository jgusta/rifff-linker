import { SITE_NAME } from 'config';
import {
  css, cx, sm
} from 'styles';
import LeftNav from './nav/LeftNav.tsx';
import RightNav from './nav/RightNav.tsx';

export default function Nav({ tClass }: { tClass: string }) {

  const flexRow = css`display: flex; flex-direction: row;`
  const spread = css`justify-content: space-between;align-items: center;`
  const bgGray800 = css`background-color: #1f2937;`

  const navClasses = cx(bgGray800, flexRow, spread)

  return (
    <nav class={cx(navClasses, tClass)}>
      <LeftNav></LeftNav>
      <RightNav></RightNav>
    </nav>
  );
}
