import { tw } from "twind"
type Props = {
  href: string
  children: string
}
export default (props: Props) => {
  return (
    <div
      class={tw`text-center h-8 font-size-[16px] my-2 py-2 hover:bg-gray-700 bg-gray-700 flex flex-col justify-center shadow border(radius-[4px])`}>
      <a class={tw`text-white text-center text-sm`} href={props.href}>
        {props.children}
      </a>
    </div>
  )
}
