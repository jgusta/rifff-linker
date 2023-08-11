import { Textish, asText } from "@util/jsx.ts";
import { css } from "styles";

const style = css`
  font-size: 0.875rem;
  color: #fff;
`;

export default function (props: Textish) {
  return (
    <div class={style}>
      {asText(props.children)}
    </div>
  )
}




