import { tw } from "twind"
export default (props:{name:string, value:string}) => (
  <li class={tw`flex flex-row text-sm pt-0.5 pb-0.5 justify-between`}>
    <span class={tw`text-blue-400 text-sm font-bold`}>{props.name}:</span>
    <span class={tw`text-gray-200`}>{props.value}</span>
  </li>
)
