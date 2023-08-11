import { css } from 'fresh_emotion';
import { JSX } from 'preact';
import {liststyle} from 'styles';
export default function FeatureListItem(props: { children: JSX.Element[] }) {
  <li class={liststyle}>
    {props.children}
  </li>
}