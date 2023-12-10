import { tw } from "twind"
type Props = {
  href: string
  children: string
}
export default (props: Props) => {
  return (
    <div
      class={tw`text-center shadow border-1 border-white h-12 my-2 py-2 hover:bg-gray-900 bg-gray-700 flex flex-col justify-center`}>
      <a class={tw`text-yellow-400 text-center`} href={props.href}>
        {props.children}
      </a>
    </div>
  )
}
