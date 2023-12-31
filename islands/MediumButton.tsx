import { tw } from "twind"
type Props = {
  href: string
  children: string
}
export default (props: Props) => {
  return (
    <div
      class={tw`text-center h-4 sm:h-8 font-size-m my-2 py-4 px-4 hover:bg-gray-700 bg-gray-700 flex flex-col justify-center shadow border(radius-[2px])`}>
      <a class={tw`text-white text-center text-sm`} href={props.href}>
        {props.children}
      </a>
    </div>
  )
}
