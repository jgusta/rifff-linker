import { Textish, asText } from "@util/jsx.ts";
import { css } from "fresh_emotion";

const style = css`
  font-size: 1.25rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: #fff;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default function (props: Textish) {
  return (
    <h1 class={style}>
      {asText(props.children)}
  </h1>
  )
}