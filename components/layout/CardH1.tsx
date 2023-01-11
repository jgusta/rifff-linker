import {tw} from 'twind';
import { Textish, asText } from "@util/jsx.ts";

export default function (props: Textish) {
  return (
  <h1 class={tw`text-xl leading-tight tracking-tight md:text-2xl text-white`}>
      {asText(props.children)}
  </h1>
  )
}