import { css } from 'fresh_emotion';
import {JSX} from 'preact';
const ulCss = css`
  margin-top: 0rem;
  margin-bottom: 0rem;
`;

export default function FeatureList(props: { children: JSX.Element[] }) {
  return (
    <ul class={ulCss}>
      {props.children}
    </ul>
  );
}