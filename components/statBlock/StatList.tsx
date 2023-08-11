import { PropertySignature } from "https://deno.land/x/ts_morph@16.0.0/ts_morph.js";
import { JSX } from 'preact';
import { css } from 'styles';
const ulCss = css`
 list-style: none;
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 4rem;
  `;

type Props = {
  children: JSX.Element
}

export default function StatList(props: Props) {
  return (
    <ul class={ulCss}>
      {props.children}
    </ul>
  );
}