import { tw } from 'twind';
import { Textish, asText } from "@util/jsx.ts";
export default function (props: Textish) {
  return (
    <div class={tw`md:text-sm text-white`}>
      {asText(props.children)}
    </div>
  )
}




